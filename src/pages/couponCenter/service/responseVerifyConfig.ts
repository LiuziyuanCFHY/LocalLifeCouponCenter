import { KSBaseResponse } from '@locallife/biz-request';

type ResponseVerifyConfig = {
    enable?: boolean;
    typeCheckMap?: {
        [key: string]: string[];
    };
    emptyCheckArray?: Array<string>;
    checkFunc?: (response: KSBaseResponse) => Promise<Error | undefined>;
};

// 券列表
const promotionCouponListCheckArray = [
    'couponVoucherList[]?.title',
    'couponVoucherList[]?.subTitle',
    'couponVoucherList[]?.discountAmount',
    'couponVoucherList[]?.couponConfigId',
    'couponVoucherList[]?.targetType',
    'couponVoucherList[]?.receivedCount',
    'couponVoucherList[]?.receiveStatus',
    'couponVoucherList[]?.expireTime',
    'couponVoucherList[]?.targetTypeName',
    'couponVoucherList[]?.useStartTime',
    'couponVoucherList[]?.couponName',
    'couponVoucherList[]?.thresholdDesc',
];

// tabList
const tabListCheckArray = [
    'tabList[]?.status',
    'tabList[]?.name',
    'rightInfoList[]?.name',
    'rightInfoList[]?.linkUrl',
];

export const responseVerifyConfigMap = {
    promotionCouponList: {
        enable: true,
        emptyCheckArray: promotionCouponListCheckArray,
    } as ResponseVerifyConfig,
    tabList: {
        enable: true,
        emptyCheckArray: tabListCheckArray,
    } as ResponseVerifyConfig,
};
