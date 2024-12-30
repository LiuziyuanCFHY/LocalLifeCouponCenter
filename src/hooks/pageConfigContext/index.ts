import { ComponentType, createContext } from 'react';

export interface IPageConfig {
    /**
     * 页面根组件，必填
     */
    page: ComponentType<any>;
    /**
     * 页面name，pv上报使用，必填
     */
    pageName: string;
    /**
     * 是否半屏，必填
     */
    isHalfScreen: boolean;
    /**
     * 页面pv是否上报
     */
    pvReported?: boolean;
    /**
     * 页面请求，非必填
     */
    onRequest?: (params?: any) => Promise<any>;
    /**
     * 请求的queryKey，非必填
     */
    queryKey?: string;
    /**
     * 请求loading组件，非必填
     */
    LoadingComponent?: ComponentType<any>;
    /**
     * 请求error组件，非必填
     */
    ErrorComponent?: ComponentType<any>;
    /**
     * 页面路由必填参数，非必填
     */
    requireRouteParams?: string[];

    /**
     * 是否是无限列表页面，非必填
     */
    isInfiniteQuery?: boolean;
}

export const PageConfigContext = createContext({} as IPageConfig);
