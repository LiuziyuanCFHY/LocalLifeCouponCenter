import { CouponItemV2Model } from '@locallife/biz-marketing';

export interface ICouponCenterTabInfoModel {
    tabList: TabInfo[];
    rightInfoList: RightInfo[];
}

export interface RightInfo {
    name: string;
    linkUrl: string;
}

export interface TabInfo {
    status: string;
    name: string;
}

export interface ICouponCenterDataModel {
    couponVoucherList: CouponItemV2Model[];
    recoCouponList?: CouponItemV2Model[];
    pcursor: number;
}
