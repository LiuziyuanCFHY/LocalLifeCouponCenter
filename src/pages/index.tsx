import React, { useContext } from 'react';
import { store } from '@/store';
import { Provider } from 'react-redux';
import { TTheme } from '@locallife/utils';
import { EStyleUtil } from '@/utils/EStyleUtil';
import { ThemeContext } from '@kid-ui/krn';
import { PageConfig } from '@/pages/pageConfig';
import { appModel } from '@/utils/appModel';
import { useAppState } from '@/hooks/useAppState';
import { AppStateContext } from '@/hooks/appStateContext';
import { useAbKswitchInit } from '@/hooks/useAbSwitchInit';
import { AbKswitchContext } from '@/hooks/abKswitchContext';
import { PageConfigContext } from '@/hooks/pageConfigContext';

export const PageWrapper = () => {
    const theme = useContext(ThemeContext);
    EStyleUtil.build({ $theme: theme as TTheme });
    const pageConfig = PageConfig(appModel.componentName);
    const PageComponent = pageConfig.page;
    return (
        <PageConfigContext.Provider value={pageConfig}>
            <AppStateContext.Provider value={useAppState()}>
                <AbKswitchContext.Provider value={useAbKswitchInit()}>
                    <Provider store={store}>
                        <PageComponent />
                    </Provider>
                </AbKswitchContext.Provider>
            </AppStateContext.Provider>
        </PageConfigContext.Provider>
    );
};
