import React from 'react';
import {
    bizRequest,
    BizRequestConfig,
    RequestMethod,
} from '@locallife/biz-request';
import { ICouponCenterTabInfoModel } from '@/pages/couponCenter/service/couponCenterModels';
import { IPageConfig } from '@/hooks/pageConfigContext';
import { IBaseResponse } from '@locallife/base-request';
import { CouponCenterNavigation } from '@/pages/couponCenter/index';
import { appModel } from '@/utils/appModel';
import { CouponCenterRouteName } from '@/pages/couponCenter/constant/couponCenterConstant';
import { LogPage } from '@/utils/logger';
import { responseVerifyConfigMap } from '@/pages/couponCenter/service/responseVerifyConfig';

/**
 *  kwai://kds/react?bundleId=LocalLifeCouponCenter&componentName=couponCenter&isHalf=true/false
 *  kwai://kds/react/bottom_sheet?bundleId=LocalLifeCouponCenter&componentName=couponCenter&height=0.8&cornerRadius=16&bgColor=%23F8F8F8&channelSource=xxx&isHalf=true
 */
class CouponCenterConfig implements IPageConfig {
    onRequest(params?: any): Promise<IBaseResponse<ICouponCenterTabInfoModel>> {
        // 页面首个请求，该请求完成后会上报pv、分阶段耗时
        return bizRequest.request(
            {
                method: RequestMethod.POST,
                url: '/rest/tp/app/promotion/coupon/user/voucher/tabList',
                params: {
                    // @ts-ignore
                    fetchType: params?.fetchType ?? 1,
                },
            },
            {
                responseVerifyConfig: responseVerifyConfigMap.tabList,
            } as BizRequestConfig,
        );
    }

    page: React.ComponentType<any> = CouponCenterNavigation; // 页面对应的组件

    get isHalfScreen() {
        // 是否是半屏
        return appModel.isHalf;
    }

    pageName: string =
        (appModel.instance.routeName || CouponCenterRouteName.CouponCenter) ===
        CouponCenterRouteName.CouponCenter
            ? LogPage.LOCALLIFE_MY_COUPON_LANDING
            : LogPage.LOCALLIFE_MY_COUPON_HISTORY; // 页面名称，填写pv上报的名称

    queryKey = 'couponCenter'; // 页面对应的queryKey

    requireRouteParams: string[] = []; // 快链中必须的参数
}

export const couponCenterConfig = new CouponCenterConfig();
