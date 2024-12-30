import { Route } from '@kid-ui/krn';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '@/store';
import {
    selectCouponCenterTabData,
    selectCouponHistoryTabData,
} from '@/pages/couponCenter/slice/couponCenterDataSlice';
import { CouponCenterRouteName } from '@/pages/couponCenter/constant/couponCenterConstant';
import { isEmptyArray } from '@locallife/utils';
import type {
    NavigationState,
    Scene,
} from '@kid-ui/krn/lib/components/tab-view/types';
import { localLifeBizLogger } from '@locallife/log/src/LocalLifeBizLogger';
import { LogAction } from '@/utils/logger';
import { invoke } from '@kds/bridge-lite';
import { appModel } from '@/utils/appModel';

/**
 * tab hook
 */
export const useInitTab = (
    routeName: CouponCenterRouteName,
): {
    routes: Route[] | undefined;
    selectIndex: number;
    onIndexChange: (index: number) => void;
    navigationState: NavigationState<Route>;
} => {
    const couponTabList = useAppSelector(selectCouponCenterTabData);
    const historyTabList = useAppSelector(selectCouponHistoryTabData);

    const tabList =
        routeName === CouponCenterRouteName.CouponCenter
            ? couponTabList
            : historyTabList;

    const tabRoutes = useMemo(() => {
        if (isEmptyArray(tabList)) {
            return;
        }
        return tabList?.map((item) => {
            return {
                key: item?.status,
                title: item?.name,
                tabInfo: item,
            } as Route;
        });
    }, [tabList]);

    const [selectIndex, setIndex] = useState(0);
    const [routes, setRoutes] = useState<Route[]>();

    useEffect(() => {
        setRoutes(tabRoutes);
    }, [tabRoutes]);

    const onIndexChange = useCallback(
        (index: number) => {
            setIndex(index);
        },
        [setIndex],
    );

    const navigationState = useMemo(() => {
        return {
            index: selectIndex,
            routes: routes ?? [],
        };
    }, [routes, selectIndex]);

    return useMemo(() => {
        return { routes, selectIndex, onIndexChange, navigationState };
    }, [navigationState, onIndexChange, routes, selectIndex]);
};

export const useTabItemShow = (tabShowLogSet: Set<string>) => {
    return useCallback(
        (routes) => {
            routes.map((route) => {
                const currentStatus = route.key;
                if (!tabShowLogSet.has(currentStatus)) {
                    tabShowLogSet.add(currentStatus);
                    localLifeBizLogger.show(LogAction.TAB_BUTTON, {
                        tab_name: route.title,
                    });
                }
            });
        },
        [tabShowLogSet],
    );
};

export const useTabItemClick = () => {
    return useCallback((scene: Scene<Route>) => {
        const clickRoute = scene.route;
        localLifeBizLogger.click(LogAction.TAB_BUTTON, {
            tab_name: clickRoute.title,
        });
    }, []);
};

const dispatchGlobalEvent = (type: string, action: string) => {
    invoke('event.dispatchGlobalEvent', {
        type,
        data: { action },
    }).catch((e) => {
        console.error('Error dispatching global event:', e);
    });
};

export const useNearbyMsgHook = () => {
    const isFromMsg = appModel.instance.isFromMsg === 'true';
    const eventType = 'LOCAL_LIFE_OD_CONTROLS';

    const onInvokeDismiss = useCallback(() => {
        dispatchGlobalEvent(eventType, 'dismiss');
    }, []);

    useEffect(() => {
        if (isFromMsg) {
            dispatchGlobalEvent(eventType, 'show');

            return () => {
                onInvokeDismiss();
            };
        }
    }, [isFromMsg, eventType, onInvokeDismiss]);
};
