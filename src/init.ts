import { _IAppInitProps, appModel } from '@/utils/appModel';
import { setGlobalConfig } from '@kds/bridge-lite';
import { LocalLifeDebugLogger, LocalLifeInitLogger } from '@locallife/log';
import { weblog } from '@/utils/logger';
import { NativeModules, Platform, Text, YellowBox } from 'react-native';
import React from 'react';
import { PageConfig } from '@/pages/pageConfig';
import { isEmptyArray, isLowPhone } from '@locallife/utils';
import { bizRequest } from '@locallife/biz-request';
import { LocalLifeImageHelper } from '@locallife/base-image';
import { initAppProps } from '@locallife/init';
import { init as bridgeInit } from '@krn/live-bridge/dist/init';
import { IInitAPPProps } from '@krn/live-bridge/dist/common';

YellowBox.ignoreWarnings([
    'Please set rootTag when use bridge: tool.setRubasDimension',
    'Please set rootTag when use bridge: tool.publishRubas',
    'Please set rootTag when use bridge: tool.getKswitchData',
    'Please set rootTag when use bridge: system.getServerTime',
    'Please set rootTag when use bridge: system.getNetWorkType',
    'Please set rootTag when use bridge: ui.showToast',
]);

export function initApp(props: _IAppInitProps) {
    bridgeInit({ ...props } as IInitAPPProps);
    setGlobalConfig({ rootTag: props.rootTag });
    LocalLifeInitLogger.initWeblog(weblog);
    initAppProps(props);
    LocalLifeImageHelper.init(props, props.componentName);
    // 初始化appModel
    appModel.init(props);
    // 统一解决安卓text有可能被截断问题
    const defaultFontFamily = {
        ...Platform.select({
            android: { fontFamily: '' },
        }),
    };
    // @ts-ignore
    const oldRender = Text.render;
    // @ts-ignore
    Text.render = function (...args) {
        const origin = oldRender.call(this, ...args);
        return React.cloneElement(origin, {
            style: [defaultFontFamily, origin.props.style],
        });
    };
    NativeModules.KRNBasic.setSlideBack({
        enabled: false, //  true: 打开滑动返回  false ：关闭滑动返回
        rootTag: appModel.rootTag,
    });
}

export function createConfig(props: _IAppInitProps) {
    const config = PageConfig(props.componentName);
    if (!isEmptyArray(config.requireRouteParams)) {
        config.requireRouteParams!.forEach((item) => {
            if (!props[item]) {
                if (__DEV__) {
                    throw new Error(
                        `快链错误缺少参数:${item},
                        请参考pages/{{demo}}/config下的注释快链，以及对应的requireRouteParams数组；
                        当前快链参数====>${JSON.stringify(props)}`,
                    );
                } else {
                    LocalLifeDebugLogger.e(
                        'error_route_params',
                        `${props.bundleId}_${props.componentName}`,
                        { reason: `${JSON.stringify(props)}缺少参数${item}` },
                    );
                }
            }
        });
    }
    LocalLifeInitLogger.setBizInfo({
        page: config.pageName,
        coPage: config.isHalfScreen,
        params: {
            is_low_phone: isLowPhone(),
            component_name: props.componentName,
            bundle_id: props.bundleId,
            bundle_version_code: props.BundleVersionCode,
            container_type: 'RN',
        },
    });
    bizRequest.bizInit(
        {
            businessName: 'api', // ***** 影响请求host *****
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            params: {
                bundleVersionCode: __DEV__ ? 1 : appModel.bundleVersionCode, //为了开发环境命中预请求
            },
            responseType: 'string',
        },
        {
            enableResponseBaseVerify: true,
            responseBaseVerifyFunc: (response) => response.result === 1,
        },
    );
    return config;
}
