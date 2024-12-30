import { IPageConfig } from '@/hooks/pageConfigContext';

export const PageConfig = (pageName): IPageConfig => {
    let config: IPageConfig;
    switch (pageName) {
        case 'couponCenter':
            config = require('./couponCenter/config').couponCenterConfig;
            break;
        default:
            const update = require('./update');
            config = {
                isHalfScreen: false,
                pageName: '',
                page: update.App,
            };
            break;
    }
    return config;
};
