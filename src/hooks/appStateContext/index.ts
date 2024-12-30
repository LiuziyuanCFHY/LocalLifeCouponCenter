import { createContext } from 'react';

export type TAppShowState =
    | ''
    | 'destroy'
    | 'background'
    | 'hide'
    | 'show'
    | 'active'
    | 'inactive';
interface IAppState {
    /**
     * 是否低内存.建议的操作：1. 停止动画动图 2. 给用户提醒 3. 清除不用各种缓存 4. 结合业务，做一些有利于释放内存的动作
     */
    isLowMemory: boolean;
    /**
     * 页面显示状态
     */
    appShowState: TAppShowState;
    /**
     * 页面是否隐藏，对appShowState的封装
     */
    isAppHidden: boolean;
}
export const AppStateContext = createContext({} as IAppState);
