import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import {
    RightInfo,
    TabInfo,
} from '@/pages/couponCenter/service/couponCenterModels';
import { CouponItemV2Model } from '@locallife/biz-marketing';
import { CouponCenterFetchType } from '@/pages/couponCenter/constant/couponCenterConstant';

interface CouponInfoMapModel {
    [key: string]: CouponItemV2Model[];
}
type CouponMapPayload = {
    status: string;
    data: CouponItemV2Model[];
};
export const couponCenterDataSlice = createSlice({
    name: 'couponCenterData',
    initialState: {
        couponCenterTabInfo: [] as TabInfo[],
        historyCouponTabInfo: [] as TabInfo[],
        rightInfo: [] as RightInfo[],
        couponInfoMap: {} as CouponInfoMapModel,
        recoCouponInfoList: [] as CouponItemV2Model[],
    },
    reducers: {
        updateTabInfo: (
            state,
            action: PayloadAction<{
                fetchType: CouponCenterFetchType;
                tabList: TabInfo[];
            }>,
        ) => {
            const fetchType = action.payload.fetchType;
            switch (fetchType) {
                case CouponCenterFetchType.CouponCenter:
                    state.couponCenterTabInfo = action.payload.tabList;
                    break;
                case CouponCenterFetchType.HistoryCoupon:
                    state.historyCouponTabInfo = action.payload.tabList;
                    break;
            }
        },
        updateRightInfoData: (state, action: PayloadAction<RightInfo[]>) => {
            state.rightInfo = action.payload;
        },
        updateCouponInfoMap: (
            state,
            action: PayloadAction<CouponMapPayload>,
        ) => {
            state.couponInfoMap[action.payload.status] = action.payload.data;
        },
        appendCouponInfoList: (
            state,
            action: PayloadAction<CouponMapPayload>,
        ) => {
            const { data, status } = action.payload;
            state.couponInfoMap[status] = (
                state.couponInfoMap[status] ?? []
            ).concat(...data);
        },
        updateRecoCouponList: (
            state,
            action: PayloadAction<CouponItemV2Model[]>,
        ) => {
            state.recoCouponInfoList = action.payload ?? [];
        },
        appendRecoCouponList: (
            state,
            action: PayloadAction<CouponItemV2Model[]>,
        ) => {
            state.recoCouponInfoList = state.recoCouponInfoList.concat(
                action.payload ?? [],
            );
        },
    },
});

export const {
    updateTabInfo,
    updateRightInfoData,
    updateCouponInfoMap,
    appendCouponInfoList,
    updateRecoCouponList,
    appendRecoCouponList,
} = couponCenterDataSlice.actions;

export const selectCouponCenterTabData = (state: RootState) =>
    state.couponCenterData.couponCenterTabInfo;
export const selectCouponHistoryTabData = (state: RootState) =>
    state.couponCenterData.historyCouponTabInfo;

export const selectRightInfo = (state: RootState) =>
    state.couponCenterData.rightInfo;

export const selectCouponMap = (state: RootState) =>
    state.couponCenterData.couponInfoMap;

export const selectRecoCouponList = (state: RootState) =>
    state.couponCenterData.recoCouponInfoList;

export default couponCenterDataSlice.reducer;
