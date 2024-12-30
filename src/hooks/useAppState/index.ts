import { NativeEventEmitter, NativeModules } from 'react-native';
import { useEffect, useState } from 'react';
import { appModel } from '@/utils/appModel';
import { TAppShowState } from '@/hooks/appStateContext';

/**
 * ios
 *      切后台再回到app变化：inactive->background->active
 *      A页面打开B页面再回到A页面变化：
 *          A页面hide->show
 *          B页面show->hide->destroy
 * android
 *      切后台再回到app变化：hide->background->active->show
 *      A页面打开B页面再回到A页面变化：
 *          A页面hide->show
 *          B页面show->hide
 */
export function useAppState() {
    const [isAppHidden, setIsAppHidden] = useState(false);
    const [isLowMemory, setIsLowMemory] = useState(false);
    const [appShowState, setAppShowState] = useState<TAppShowState>('');
    useEffect(() => {
        const KRNAppState = new NativeEventEmitter(NativeModules.KRNAppState);
        const appStateListener = KRNAppState.addListener(
            'krnAppStateDidChange',
            ({ appState, rootTag }) => {
                if (rootTag != null && appModel.rootTag !== rootTag) {
                    return;
                }
                setAppShowState(appState);
                console.log(
                    `componentName:${appModel.componentName} appState change to============> ${appState} `,
                );
                if (
                    appState === 'hide' ||
                    appState === 'inactive' ||
                    appState === 'background'
                ) {
                    setIsAppHidden(true);
                    console.log('appState isHidden ：' + true);
                } else {
                    setIsAppHidden(false);
                    console.log('appState isHidden ：' + false);
                }
            },
        );

        const memoryListener = KRNAppState.addListener(
            'kdsMemoryWarning',
            ({ data }) => {
                console.warn('kdsMemoryWarning', data);
                // 建议的操作：1. 停止动画动图 2. 给用户提醒 3. 清除不用各种缓存 4. 结合业务，做一些有利于释放内存的动作
                setIsLowMemory(true);
            },
        );

        return () => {
            appStateListener.remove();
            memoryListener.remove();
        };
    }, []);
    return { isAppHidden, isLowMemory, appShowState };
}
