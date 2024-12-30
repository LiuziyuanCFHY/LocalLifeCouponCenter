import { MutableRefObject, useCallback, useMemo } from 'react';
import { UseInfiniteQueryResult } from 'react-query';
import { TabInfo } from '@/pages/couponCenter/service/couponCenterModels';
import { CouponItemV2Model } from '@locallife/biz-marketing';
import { useAppSelector } from '@/store';
import { selectCouponMap } from '@/pages/couponCenter/slice/couponCenterDataSlice';

export const useLoadMore = (
    canLoad: MutableRefObject<boolean>,
    result: UseInfiniteQueryResult,
): (() => void) => {
    return useCallback(() => {
        if (canLoad.current) {
            if (
                result.hasNextPage &&
                !result.isFetching &&
                result.data?.pages?.length
            ) {
                result.fetchNextPage();
            }
        }
    }, [canLoad, result]);
};

/**
 * 获取对应tab下的优惠券列表
 * 返回的数据为tabInfo
 * 包括列表数据，是否为空，tab类型
 * @param tabName 列表名
 */
export const useCommonTabData = (
    tabName: TabInfo,
): {
    couponList: CouponItemV2Model[];
    isEmpty: boolean;
} => {
    const couponMap = useAppSelector(selectCouponMap);
    const couponList = useMemo(() => {
        return couponMap[tabName.status] ?? [];
    }, [couponMap, tabName.status]);

    const isEmpty = couponList.length === 0;
    return useMemo(() => {
        return {
            couponList,
            isEmpty,
        };
    }, [couponList, isEmpty]);
};
