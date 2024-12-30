import { Weblog } from '@ks/weblogger/es/log.krnbridge';
import AutoPV from '@kds/autopv';
import { TParams } from '@locallife/biz-request';
import { appModel } from '@/utils/appModel';
import { CouponCenterRouteName } from '@/pages/couponCenter/constant/couponCenterConstant';
import LocalLifeInitLogger from '@locallife/log/src/LocalLifeInitLogger';

export const weblog = new Weblog({});

export enum LogPage {
    LOCALLIFE_MY_COUPON_LANDING = 'LOCALLIFE_MY_COUPON_LANDING', // 我的优惠券
    LOCALLIFE_MY_COUPON_HISTORY = 'LOCALLIFE_MY_COUPON_HISTORY', //历史优惠券
}

export enum LogAction {
    TAB_BUTTON = 'TAB_BUTTON', //tab_btn
    RIGHT_TOP_FUNC_BUTTON = 'RIGHT_TOP_FUNC_BUTTON', //右侧更多的 btn
    RECO_COUPON_TAG = 'RECO_COUPON_TAG', //推荐好券标签
}

export const BtnElement = {
    MORE_CATE: 'MORE_CATE', //更多
};

export class Logger {
    static addAutoPVLoggerPlugin(navigation, extParams?: TParams) {
        const pvOption = LocalLifeInitLogger.getPvEventOption();
        const pvParams = {
            ...pvOption.params,
            ...extParams,
        };
        const plugin = new AutoPV({
            navigation: navigation.current, // 非必填 使用 react-navigation 需要传入 navigation Ref
            componentName: appModel.componentName, // 必填
            bundleId: appModel.bundleId, // 必填
            coPage: appModel.isHalf, // 非必填 ,半屏为true
            debug: true, // 非必填，打印打点信息
            // 每次 autoPv 上报埋点时都会先经过 pageMap，可在这里选择是否过滤掉埋点，返回 false 则不上报
            // @ts-ignore
            pageMap: ({ page }) => {
                // page指的navigation 的name
                switch (page) {
                    case CouponCenterRouteName.CouponCenter:
                        return {
                            page: LogPage.LOCALLIFE_MY_COUPON_LANDING,
                            params: pvParams,
                        };
                    case CouponCenterRouteName.HistoryCoupon:
                        return {
                            page: LogPage.LOCALLIFE_MY_COUPON_HISTORY,
                            params: pvParams,
                        };
                }
            },
        });
        weblog.addPluginInstance(plugin);
    }
}
