import {
    ImageStyle,
    NativeModules,
    StyleProp,
    TextStyle,
    ViewStyle,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { TTheme } from '@locallife/utils';
import { rem } from '@kid-ui/krn/lib/utils';

type Function<K> = () => K;
type Value<T> = T | (string & {});
type Variable<T> = Value<T> | Function<Value<T>>;
type Extended<T> = { [K in keyof T]: Variable<T[K]> };

export type AnyStyle = ImageStyle & TextStyle & ViewStyle;
type AnyStyleSet = { [key: string]: AnyStyle };
type MediaQuery = { [key: string]: Extended<AnyStyle> };

type EStyleSet<T = any> = {
    [K in keyof T]: T[K] extends Variable<number>
        ? T[K]
        : T[K] extends MediaQuery
        ? T[K]
        : Extended<AnyStyle>;
};
type StyleSet<T = any> = {
    [K in keyof T]: T[K] extends number
        ? T[K]
        : T[K] extends string
        ? T[K]
        : T[K] extends Function<number>
        ? number
        : T[K] extends Function<string>
        ? string
        : T[K] extends MediaQuery
        ? AnyStyleSet
        : AnyStyle;
};

const DIMENSIONS_WHITE_LIST = [
    'flex',
    'flexGrow',
    'flexShrink',
    'flexBasis',
    'zIndex',
    'aspectRatio',
    'opacity',
    'elevation',
    'shadowOpacity',
    'scale',
];

interface EStyleRows {
    $theme?: TTheme;
}
class EStyleWrapper {
    globalRows: EStyleRows = {
        $theme: NativeModules.KSAppearance.getColorScheme() as TTheme,
    };

    updateNumberStyles(styles: AnyStyle): void {
        for (const key in styles) {
            if (
                typeof styles[key] === 'number' &&
                !DIMENSIONS_WHITE_LIST.includes(key)
            ) {
                styles[key] = rem(styles[key]);
            }
        }
    }
    create = <T = EStyleSet>(styles: EStyleSet<T>) => {
        for (const key in styles) {
            if (typeof styles[key] === 'object') {
                this.updateNumberStyles(styles[key] as AnyStyle);
            }
        }
        return EStyleSheet.create(styles) as StyleSet<T>;
    };

    build(obj: EStyleRows = {}) {
        this.globalRows = { ...this.globalRows, ...obj };
        EStyleSheet.build(this.globalRows);
    }

    value(namespace: keyof EStyleRows) {
        return EStyleSheet.value(namespace);
    }

    flatten<T>(style?: StyleProp<T>) {
        return EStyleSheet.flatten(style);
    }

    /**
     * 将数字转换为rem，用于在EStyleUtil样式***外***使用
     * 某些场景中你需要和EStyleUtil样式内的数字保持一致，可以使用该方法，因为EStyleUtil样式内的数字已经默认转换了
     * @param num
     */
    transNumberToRem(num: number) {
        return rem(num);
    }
}
export const EStyleUtil = new EStyleWrapper();
