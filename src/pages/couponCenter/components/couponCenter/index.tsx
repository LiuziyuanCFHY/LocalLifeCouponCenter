import { StyleSheet, Text, View } from 'react-native';
import { KidIcon, KidLoading, KidTabView, LoadingType } from '@kid-ui/krn';
import React, { useCallback } from 'react';
import {
    getCouponCenterTabQueryKey,
    useQueryCouponCenterTab,
} from '@/pages/couponCenter/service/couponCenterApis';
import { styles } from './styles';
import {
    useInitTab,
    useNearbyMsgHook,
    useTabItemClick,
    useTabItemShow,
} from '@/pages/couponCenter/hook/hooks';
import {
    CouponCenterFetchType,
    CouponCenterRouteName,
} from '../../constant/couponCenterConstant';
import { useUnmount } from '@locallife/biz-hooks';
import { LogPage } from '@/utils/logger';
import { CommonTabHeaderScene } from '../tabScene';
export function CouponCenter() {
    const tabShowLogSet = new Set<string>();
    const { isLoading, isSuccess, refetch, isError } = useQueryCouponCenterTab(
        CouponCenterFetchType.CouponCenter,
    );
    const { routes, onIndexChange, navigationState, selectIndex } = useInitTab(
        CouponCenterRouteName.CouponCenter,
    );

    console.log('navigationState', navigationState);

    const renderScene = useCallback(({ route }) => {
        return (
            <CommonTabHeaderScene
                channelPage={LogPage.LOCALLIFE_MY_COUPON_LANDING}
                key={`coupon_center_scene_${route.tabInfo.status}`}
                tabInfo={route.tabInfo}
            />
        );
    }, []);

    const onTabItemShow = useTabItemShow(tabShowLogSet);

    const onTabClick = useTabItemClick();

    useUnmount(() => {
        tabShowLogSet.clear();
    });
    return (
        <View style={{ flex: 1 }}>
            <View>
                <Text>123</Text>
            </View>
            <KidTabView
                kid={'style_tab_primary_left'}
                tabBgColor={'#f8f8f8'}
                fitTextWidth={true}
                renderScene={renderScene}
                lazy={true}
                onTabBarItemsLayoutChange={onTabItemShow}
                indicatorStyle={styles.indicatorStyle}
                tabItemActiveTextStyle={styles.tabItemActiveStyle}
                tabItemStyle={styles.tabItemStyle}
                tabItemTextStyle={styles.tabItemTextStyle}
                overdrag={false}
                showBottomShadow={false}
                onTabPress={onTabClick}
                navigationState={navigationState}
                onIndexChange={onIndexChange}
            />
        </View>
    );
}
