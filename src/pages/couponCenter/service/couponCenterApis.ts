import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { usePageQuery } from '@locallife/page';
import {
    ICouponCenterDataModel,
    ICouponCenterTabInfoModel,
    TabInfo,
} from '@/pages/couponCenter/service/couponCenterModels';
import { PageConfigContext } from '@/hooks/pageConfigContext';
import { IBaseResponse, RequestMethod } from '@locallife/base-request';
import {
    appendCouponInfoList,
    appendRecoCouponList,
    updateCouponInfoMap,
    updateRecoCouponList,
    updateRightInfoData,
    updateTabInfo,
} from '@/pages/couponCenter/slice/couponCenterDataSlice';
import {
    CouponBusiness,
    CouponCenterFetchType,
    CouponPageSize,
    NO_MORE,
} from '@/pages/couponCenter/constant/couponCenterConstant';
import { useInfiniteQuery } from 'react-query';
import { bizRequest, BizRequestConfig } from '@locallife/biz-request';
import { appModel } from '@/utils/appModel';
import {
    JinJingLogAction,
    jinJingLogCommonEvent,
} from '@/utils/jinjingLogUtil';
import { responseVerifyConfigMap } from '@/pages/couponCenter/service/responseVerifyConfig';

export const getCouponCenterTabQueryKey = (
    fetchType: CouponCenterFetchType,
) => {
    return fetchType === CouponCenterFetchType.CouponCenter
        ? 'couponCenter'
        : ['historyCoupon', fetchType];
};

export const getCouponListQueryKey = (tabInfo: TabInfo) => {
    return ['couponList', tabInfo.name];
};

export const getCouponListQueryPath = () =>
    '/rest/tp/app/promotion/coupon/user/voucherV2';

export const getRecoListQueryKey = (tabInfo: TabInfo) => {
    return ['recoList', tabInfo.name];
};

/**
 * 请求 tab 相关数据
 * @param fetchType
 */
export const useQueryCouponCenterTab = (fetchType: CouponCenterFetchType) => {
    const pageConfig = useContext(PageConfigContext);
    const dispatch = useDispatch();
    return usePageQuery<IBaseResponse<ICouponCenterTabInfoModel>>(
        getCouponCenterTabQueryKey(fetchType),
        () => {
            // @ts-ignore
            return pageConfig.onRequest({ fetchType });
        },
        {
            onSettled: (response, error) => {
                if (response) {
                    if (response.data?.tabList) {
                        dispatch(
                            updateTabInfo({
                                fetchType: fetchType,
                                tabList: response?.data.tabList,
                            }),
                        );
                    }
                    if (response.data?.rightInfoList) {
                        dispatch(
                            updateRightInfoData(response?.data?.rightInfoList),
                        );
                    }
                }

                if (error) {
                    jinJingLogCommonEvent(
                        {
                            fetchType: fetchType,
                            errorCode: response?.code,
                            errorMsg: response?.errMsg,
                            traceId: response?.traceId,
                        },
                        JinJingLogAction.ACTION_TAB_ERROR,
                        'coupon_center_tab_error',
                        '新版券中心 tab 请求失败',
                    );
                }
            },
        },
    );
};

/**
 * 请求tab 下的列表数据
 * @param tabInfo
 * @param pageSize
 */
export const useQueryCouponList = (
    tabInfo: TabInfo,
    pageSize: number = CouponPageSize,
) => {
    const dispatch = useDispatch();
    const params = {
        status: tabInfo.status,
        businessLine: CouponBusiness.LocalLife,
        pageSize: pageSize,
        channelSource: appModel.instance.channelSource ?? '',
        channelPage: appModel.instance.channelPage ?? '',
        extParams: appModel.instance.extParams ?? '',
    };
    return useInfiniteQuery<IBaseResponse<ICouponCenterDataModel>>(
        getCouponListQueryKey(tabInfo),
        ({ pageParam }) => {
            return bizRequest.request<IBaseResponse<ICouponCenterDataModel>>(
                {
                    url: getCouponListQueryPath(),
                    method: RequestMethod.POST,
                    params: {
                        ...params,
                        pcursor: pageParam,
                    },
                },
                {
                    responseVerifyConfig:
                        responseVerifyConfigMap.promotionCouponList,
                } as BizRequestConfig,
            );
        },
        {
            onSettled: (response, error) => {
                if (response) {
                    const currentPage = response.pages.length ?? 0;
                    if (currentPage < 1) {
                        return;
                    }
                    const lastIndex = response.pages.length - 1;
                    const lastResponse = response.pages[lastIndex];

                    if (lastIndex === 0) {
                        //首页数据
                        dispatch(
                            updateCouponInfoMap({
                                data: lastResponse.data.couponVoucherList ?? [],
                                status: tabInfo.status,
                            }),
                        );
                    } else {
                        // Tab分页数据
                        const couponList =
                            lastResponse.data.couponVoucherList ?? [];
                        if (couponList) {
                            dispatch(
                                appendCouponInfoList({
                                    data: couponList,
                                    status: tabInfo.status,
                                }),
                            );
                        }
                    }
                }

                if (error) {
                    jinJingLogCommonEvent(
                        {
                            ...params,
                            errorInfo: JSON.stringify(response?.pages ?? []),
                        },
                        JinJingLogAction.ACTION_V2_LIST_REQUEST_ERROR,
                        'coupon_center_v2_list_error',
                        '新版券中心券列表请求失败',
                    );
                }
            },
            getNextPageParam: (
                lastPage: IBaseResponse<ICouponCenterDataModel>,
            ) => {
                if (lastPage?.data?.pcursor !== NO_MORE) {
                    return lastPage?.data?.pcursor;
                }
                return undefined;
            },
        },
    );
};

export const useQueryRecoList = (tabInfo: TabInfo) => {
    const dispatch = useDispatch();
    const params = {
        businessLine: CouponBusiness.LocalLife,
        pageSize: CouponPageSize,
        channelSource: appModel.instance.channelSource ?? '',
        channelPage: appModel.instance.channelPage ?? '',
        extParams: appModel.instance.extParams ?? '',
    };
    return useInfiniteQuery<IBaseResponse<ICouponCenterDataModel>>(
        getRecoListQueryKey(tabInfo),
        ({ pageParam }) => {
            return bizRequest.request<IBaseResponse<ICouponCenterDataModel>>(
                {
                    url: '/rest/tp/app/promotion/coupon/user/recoCouponList',
                    method: RequestMethod.POST,
                    params: {
                        ...params,
                        pcursor: pageParam,
                    },
                },
                {
                    responseVerifyConfig:
                        responseVerifyConfigMap.promotionCouponList,
                } as BizRequestConfig,
            );
        },
        {
            onSettled: (response, error) => {
                if (response) {
                    const currentPage = response.pages.length ?? 0;
                    if (currentPage < 1) {
                        return;
                    }
                    const lastIndex = response.pages.length - 1;
                    const lastResponse = response.pages[lastIndex];
                    if (lastIndex === 0) {
                        //首页数据
                        dispatch(
                            updateRecoCouponList(
                                lastResponse.data.recoCouponList ?? [],
                            ),
                        );
                    } else {
                        // Tab分页数据
                        const couponList =
                            lastResponse.data.recoCouponList ?? [];
                        if (couponList) {
                            dispatch(appendRecoCouponList(couponList));
                        }
                    }
                }

                if (error) {
                    jinJingLogCommonEvent(
                        {
                            ...params,
                            errorInfo: JSON.stringify(response?.pages ?? []),
                        },
                        JinJingLogAction.ACTION_COUPON_RECO_LIST_ERROR,
                        'coupon_center_coupon_reco_list_error',
                        '新版券中心推荐券请求失败',
                    );
                }
            },
        },
    );
};
