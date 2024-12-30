import React, { memo, useMemo, useRef } from 'react';
import { CouponListV2 } from '@locallife/biz-marketing';
import { TabInfo } from '@/pages/couponCenter/service/couponCenterModels';
import {
    getCouponListQueryKey,
    getCouponListQueryPath,
    useQueryCouponList,
} from '@/pages/couponCenter/service/couponCenterApis';
import { styles } from './styles';
import { CouponFooter } from '@/pages/couponCenter/components/footer';
import {
    useCommonTabData,
    useLoadMore,
} from '@/pages/couponCenter/components/tabScene/hook';
import { LoadingStateView } from '@/components/loadingView';
import { ErrorComponent } from '@/components/errorView/index';
import { View } from 'react-native';
import { RecoCouponView } from '@/pages/couponCenter/components/recoCoupon';
import {
    FallbackContentTop,
    FallbackViewWrap,
    SceneCodeType,
    StatusCodeType,
} from '@locallife/fallbackcomponents';
import { appModel } from '@/utils/appModel';

interface CommonTabSceneProp {
    tabInfo: TabInfo;
    channelPage: string;
}

export const CommonTabHeaderScene = memo(
    ({ tabInfo, channelPage }: CommonTabSceneProp) => {
        const result = useQueryCouponList(tabInfo);
        const {
            isLoading,
            isRefetching,
            isFetchingNextPage,
            isIdle,
            isError,
            refetch,
        } = result;

        const { couponList } = useCommonTabData(tabInfo);

        const onScrollBeginDragRef = useRef(true); // 滑动标志位
        const getNextPage = useLoadMore(onScrollBeginDragRef, result);

        const keyExtractor = (item, index) => {
            return `${tabInfo.status}_${item.couponVoucherId}_${index}_${item.couponConfigId}`;
        };

        const RecoFooterView = useMemo(() => {
            return (
                <RecoCouponView
                    couponCount={couponList?.length}
                    tabInfo={tabInfo}
                    channelPage={channelPage}
                />
            );
        }, [channelPage, tabInfo, couponList]);

        const getFooterView = useMemo(
            () => (
                <CouponFooter
                    fetchResult={result}
                    customFooter={RecoFooterView}
                />
            ),
            [RecoFooterView, result],
        );

        const placeHolderView = useMemo(() => {
            if (
                (isLoading || isRefetching || (isIdle && !isError)) &&
                !isFetchingNextPage
            ) {
                return (
                    <LoadingStateView
                        containerStyle={styles.sceneStatusStyle}
                    />
                );
            } else if (isError) {
                return (
                    <ErrorComponent
                        onRetry={refetch}
                        config={{
                            requestKey: getCouponListQueryKey(tabInfo),
                            path: getCouponListQueryPath(),
                        }}
                    />
                );
            } else {
                return null;
            }
        }, [
            isError,
            isFetchingNextPage,
            isIdle,
            isLoading,
            isRefetching,
            refetch,
            tabInfo,
        ]);

        return (
            <View style={styles.container}>
                <CouponListV2
                    listKey={tabInfo.status}
                    data={couponList}
                    keyExtractor={keyExtractor}
                    onEndReachedThreshold={0.2}
                    bounces={false}
                    scrollEventThrottle={16}
                    onEndReached={getNextPage}
                    ListEmptyComponent={
                        <FallbackViewWrap
                            sceneId={'LocalLifeCouponCenter'}
                            statusCode={StatusCodeType.EMPTY_DATA}
                            sceneCodeType={SceneCodeType.coupon}
                            rootTag={appModel.rootTag}
                            contentTop={FallbackContentTop.top25}
                            customTitle={'暂无可用优惠券'}
                            containerStyle={styles.sceneEmptyView}
                        />
                    }
                    contentContainerStyle={styles.listContainer}
                    ListFooterComponent={getFooterView}
                    ListFooterComponentStyle={{ flexGrow: 1 }}
                    adaptScreen={true}
                    initialNumToRender={7}
                    couponItemStyle={styles.itemMargin}
                    showContinueReceiveBtn={false}
                    logParam={{
                        tab_name: tabInfo.name,
                    }}
                    channelPage={channelPage}
                />
                {placeHolderView}
            </View>
        );
    },
);
