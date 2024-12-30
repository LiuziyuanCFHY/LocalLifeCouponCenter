import React, { memo, useCallback, useRef } from 'react';
import {
    NavigationContainer,
    NavigationContainerRef,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { enableScreens } from 'react-native-screens';
import { appModel } from '@/utils/appModel';
import { CouponCenterRouteName } from '@/pages/couponCenter/constant/couponCenterConstant';
import {
    navigationHeaderHeight,
    screenOptions,
} from '@/pages/couponCenter/navigationConfig/config';
import { useMount } from '@locallife/base-hooks';
import { Logger } from '@/utils/logger';

enableScreens();

const { Navigator, Screen } = createStackNavigator();

type StackContainerProps = {
    routePath: CouponCenterRouteName;
};

const StackContainer = memo(({ routePath }: StackContainerProps) => {
    const { realStatusBarHeight, headerHeight } = navigationHeaderHeight();

    const options = useCallback(
        () => screenOptions(realStatusBarHeight, headerHeight),
        [headerHeight, realStatusBarHeight],
    );
    return (
        <Navigator screenOptions={options} initialRouteName={routePath}>
            <Screen
                name={CouponCenterRouteName.CouponCenter}
                getComponent={() =>
                    require('./components/couponCenter').CouponCenter
                }
                options={{
                    title: '我的优惠券',
                }}
            />
            <Screen
                name={CouponCenterRouteName.HistoryCoupon}
                getComponent={() =>
                    require('./components/historyCoupon').HistoryCoupon
                }
                options={{
                    title: '历史记录',
                }}
            />
        </Navigator>
    );
});

export const CouponCenterNavigation = memo(() => {
    const navigation = useRef<NavigationContainerRef>(null);
    useMount(() => {
        Logger.addAutoPVLoggerPlugin(navigation);
    });
    return (
        <NavigationContainer ref={navigation}>
            <StackContainer
                routePath={
                    appModel.instance.routeName ||
                    CouponCenterRouteName.CouponCenter
                }
            />
        </NavigationContainer>
    );
});
