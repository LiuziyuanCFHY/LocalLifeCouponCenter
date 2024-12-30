import { CouponCenterRouteName } from '@/pages/couponCenter/constant/couponCenterConstant';
import { CHANNEL_SOURCE } from '@/constants/channelSourceConstants';
import { HalfStyleMap } from '@/pages/couponCenter/utils/utils';

export interface _IAppInitProps {
    rootTag: number;
    onCreateTimestamp: number;
    BundleVersionCode: string;
    bundleId: string;
    componentName: string;
    isHalf: string;
    routeName: CouponCenterRouteName;
    channelSource: CHANNEL_SOURCE;
    extParams: string;
    [prop: string]: string | number;
}

export interface IAppProps {
    rootTag: number;
    onCreateTimestamp: number;
    BundleVersionCode: number;
    bundleId: string;
    componentName: string;
    isHalf: boolean;
    routeName: CouponCenterRouteName;
    extParams: string;
    channelSource: CHANNEL_SOURCE;
    channelPage?: CHANNEL_SOURCE;
    isFromMsg?: string;
}

class AppModel {
    private _appModel: IAppProps;
    init(appProps: _IAppInitProps) {
        // 以下是appProps的类型转换逻辑和初始化逻辑
        if (!this._appModel) {
            this._appModel = {
                ...appProps,
                isHalf: appProps.isHalf === 'true',
                BundleVersionCode: +appProps.BundleVersionCode,
            };
        }
        return this._appModel;
    }

    get instance() {
        if (this._appModel === undefined) {
            throw 'AppModelProvider not init';
        }
        return this._appModel;
    }

    get componentName() {
        return this.instance.componentName;
    }

    get bundleId() {
        return this.instance.bundleId;
    }

    get rootTag() {
        return this.instance.rootTag;
    }

    get bundleVersionCode() {
        return this.instance.BundleVersionCode;
    }

    get isHalf(): boolean {
        return (
            this.instance.isHalf ||
            HalfStyleMap.includes(this.instance.channelSource)
        );
    }
}

const appModel = new AppModel();
export { appModel };
