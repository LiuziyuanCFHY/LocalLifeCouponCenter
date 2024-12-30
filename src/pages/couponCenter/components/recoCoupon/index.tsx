import { ShowWithData } from '@locallife/biz-component';
import React, { useMemo, useRef } from 'react';
import { Platform, Text, View } from 'react-native';
import { CouponListV2 } from '@locallife/biz-marketing';
import { TabInfo } from '@/pages/couponCenter/service/couponCenterModels';
import { useLoadMore } from '@/pages/couponCenter/components/tabScene/hook';
import { useQueryRecoList } from '@/pages/couponCenter/service/couponCenterApis';
import { useAppSelector } from '@/store';
import { selectRecoCouponList } from '@/pages/couponCenter/slice/couponCenterDataSlice';
import { styles } from '@/pages/couponCenter/components/recoCoupon/styles';
import { isEmptyArray } from '@locallife/utils';
import { CouponFooter } from '@/pages/couponCenter/components/footer';
import { LoadingStateView } from '@/components/loadingView';
import { useMount } from '@locallife/base-hooks';
import { localLifeBizLogger } from '@locallife/log/src/LocalLifeBizLogger';
import { LogAction } from '@/utils/logger';
import { StaticLoading } from '@locallife/fallbackcomponents';

interface RecoCouponProp {
    tabInfo: TabInfo;
    channelPage: string;
    couponCount: number;
}
export const RecoCouponView = ({
    couponCount,
    tabInfo,
    channelPage,
}: RecoCouponProp) => {
    const result = useQueryRecoList(tabInfo);

    const { isLoading, isRefetching, isFetchingNextPage, isIdle, isError } =
        result;

    const recoCouponList = useAppSelector(selectRecoCouponList);
    const keyExtractor = (item, index) => {
        return `reco_${tabInfo.status}_${item.couponVoucherId}_${index}_${item.couponConfigId}`;
    };

    const onScrollBeginDragRef = useRef(false); // 滑动标志位

    const getNextPage = useLoadMore(onScrollBeginDragRef, result);

    const getFooterView = useMemo(
        () => <CouponFooter fetchResult={result} />,
        [result],
    );

    const placeHolderView = useMemo(() => {
        if (
            (isLoading || isRefetching || (isIdle && !isError)) &&
            !isFetchingNextPage
        ) {
            return <LoadingStateView />;
        } else {
            return null;
        }
    }, [isError, isFetchingNextPage, isIdle, isLoading, isRefetching]);

    useMount(() => {
        localLifeBizLogger.show(LogAction.RECO_COUPON_TAG);
    });

    return (
        <>
            {isLoading ? <LoadingStateView /> : null}
            <ShowWithData data={!isLoading && !isEmptyArray(recoCouponList)}>
                <>
                    <View style={styles.recoTitleContainer}>
                        <View style={styles.horLine} />
                        <Text style={styles.recoTitle}>推荐好券</Text>
                        <View style={styles.horLine} />
                    </View>
                    <CouponListV2
                        adaptScreen={true}
                        listKey={'reco_coupon'}
                        data={recoCouponList}
                        keyExtractor={keyExtractor}
                        onEndReachedThreshold={0.2}
                        bounces={false}
                        scrollEventThrottle={16}
                        onScrollBeginDrag={() => {
                            onScrollBeginDragRef.current = true;
                        }}
                        couponItemStyle={styles.itemMargin}
                        ListEmptyComponent={placeHolderView}
                        onEndReached={getNextPage}
                        ListFooterComponent={getFooterView}
                        logParam={{
                            tab_name: tabInfo.name,
                            extra_info: 'RECOM_GOOD_COUPON',
                        }}
                        channelPage={channelPage}
                        ListFooterComponentStyle={{ flexGrow: 1 }}
                        contentContainerStyle={{ flexGrow: 1 }}
                        style={{ flex: 1 }}
                    />
                </>
            </ShowWithData>
            {couponCount > 0 && !isLoading && isEmptyArray(recoCouponList) && (
                <View
                    style={{
                        flexGrow: 1,
                        justifyContent: 'flex-end',
                    }}
                >
                    <StaticLoading
                        containerStyle={{
                            width: '100%', // 任何场景高度固定 142，业务不用自己设置
                            height: 92,
                            marginBottom: Platform.OS == 'ios' ? 34 : 4,
                        }}
                    />
                </View>
            )}
        </>
    );
};
