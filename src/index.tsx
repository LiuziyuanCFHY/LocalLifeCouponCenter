import React, { useCallback, useMemo } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    AppRegistry,
} from 'react-native';
import { createConfig, initApp } from './init';
import { Page, usePagePreFetch } from '@locallife/page';
import { CouponCenterFetchType } from './pages/couponCenter/constant/couponCenterConstant';
import { KidContext } from '@kid-ui/krn';
import { ReportContext } from './hooks/reportContext';
import { appModel } from './utils/appModel';
import { PageWrapper } from './pages';

const App = (props) => {
    console.log(props, 'props');

    initApp(props);
    const config = useMemo(() => createConfig(props), [props]);
    const preFetch = usePagePreFetch(
        config.queryKey,
        () => config?.onRequest?.(CouponCenterFetchType.CouponCenter),
        {},
        !!config.isInfiniteQuery,
    );
    const onRequest = () => preFetch;
    const reportMap = new Map<string, boolean>();
    const reportQueue = [];

    // 初始化 navigationState 需要用到的 routes 和 index
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'chatted', title: '聊过' },
        { key: 'dialogue', title: '对话' },
        { key: 'find', title: '发现' },
    ]);
    const navigationState = { index, routes };

    return (
        <KidContext>
            <ReportContext.Provider value={{ reportMap, reportQueue }}>
                <Page
                    appProps={appModel.instance}
                    contentPager={PageWrapper}
                    needLoading={!!config.queryKey}
                    queryKey={config.queryKey}
                    onRequest={onRequest}
                    LoadingComponent={config.LoadingComponent}
                    needError={false}
                />
            </ReportContext.Provider>
        </KidContext>
    );
};

AppRegistry.registerComponent('couponCenter', () => App);
