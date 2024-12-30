import React from 'react';
import { TextStyle } from 'react-native';
import {
    StackNavigationOptions,
    TransitionPresets,
} from '@react-navigation/stack';
import { getStatusBarHeight } from '@locallife/utils';
import {
    NavigationLeftBack,
    NavigationRightClose,
} from '@/pages/couponCenter/components/navigationBack';
import { rem } from '@kid-ui/krn/lib/utils';
import { appModel } from '@/utils/appModel';

export function navigationHeaderHeight() {
    const halfMode = appModel.isHalf;
    const realStatusBarHeight = halfMode ? 0 : getStatusBarHeight();
    const headerHeight = halfMode ? 50 : 45 + realStatusBarHeight;
    return { realStatusBarHeight, headerHeight };
}

export function navigationHeaderStyle(headerHeight: number) {
    return {
        backgroundColor: '#F8F8F8',
        height: headerHeight,
        elevation: 0,
        shadowOpacity: 0,
        borderWidth: 0,
    };
}

export const screenOptions = (
    realStatusBarHeight: number,
    headerHeight: number,
) => {
    const halfMode = appModel.isHalf;
    return {
        headerStatusBarHeight: halfMode ? 0 : realStatusBarHeight,
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerStyle: navigationHeaderStyle(headerHeight),
        headerTitleStyle: {
            color: '#222',
            fontSize: rem(18),
            fontFamily: 'PingFangSC-Medium',
            fontWeight: '500',
            marginLeft: 0,
        } as TextStyle,
        headerMode: 'screen',
        headerLeft: () => {
            return halfMode ? null : <NavigationLeftBack />;
        },
        headerRight: () => {
            return halfMode ? <NavigationRightClose /> : null;
        },
        ...TransitionPresets.SlideFromRightIOS,
        animationEnabled: true,
        cardStyle: {
            backgroundColor: '#f8f8f8',
        },
    } as StackNavigationOptions;
};
