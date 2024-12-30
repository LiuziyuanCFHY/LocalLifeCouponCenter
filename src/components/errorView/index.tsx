import React from 'react';
import { View } from 'react-native';
import { CustomQueryClient } from '@locallife/page';
import { styles } from './styles';
import {
    FallbackContentTop,
    FallbackViewWrap,
    StatusCodeType,
} from '@locallife/fallbackcomponents';
import { appModel } from '@/utils/appModel';

interface Props {
    onRetry?: () => void;
    config: {
        requestKey?: any;
        path?: string;
    };
}

export const ErrorComponent = ({ onRetry, config }: Props) => {
    const { requestKey = '', path = '' } = config;
    const queryState = CustomQueryClient.get().getQueryState(requestKey);
    const error = queryState?.error as
        | { errMsg: string; code: number }
        | undefined;

    return (
        <View style={styles.container}>
            <FallbackViewWrap
                rootTag={appModel.rootTag}
                sceneId={`${path}_${requestKey}`}
                customTitle={error?.errMsg}
                onPress={onRetry}
                statusCode={error?.code || StatusCodeType.NETWORK_ERROR}
                contentTop={FallbackContentTop.top50}
            />
        </View>
    );
};
