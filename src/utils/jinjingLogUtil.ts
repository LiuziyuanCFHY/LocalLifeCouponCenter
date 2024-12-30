import { LocalLifeJinJingLogger } from '@locallife/log';

export const COUPON_CUSTOM_EVENT_KEY =
    'LOCAL_LIFE_LOG_COUPON_LIST_CUSTOM_EVENT';

export enum JinJingLogAction {
    ACTION_TAB_ERROR = 'newCouponCenterTabError',
    ACTION_V2_LIST_REQUEST_ERROR = 'couponCenterV2listRequestError',
    ACTION_COUPON_RECO_LIST_ERROR = 'couponCenterRecoCouponError',
}
export const jinJingLogCommonEvent = (
    params: object,
    action: string,
    tag: string,
    msg?: string,
    error?: any,
) => {
    const logParam = {
        ...params,
        biz: 'local_life',
        action: action,
    };
    LocalLifeJinJingLogger.reportLog2JinJing(
        COUPON_CUSTOM_EVENT_KEY,
        true,
        `[coupon-center]:[${tag}]`,
        msg ?? undefined,
        logParam,
        error,
    );
};
