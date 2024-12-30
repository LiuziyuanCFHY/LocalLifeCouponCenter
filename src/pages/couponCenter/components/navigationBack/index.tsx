import React, { memo } from 'react';
import { TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { KidIcon } from '@kid-ui/krn';
import { useNavigation } from '@react-navigation/native';
import { getInitData } from '@krn/live-bridge/dist/init';
import { closePage } from '@locallife/utils';
import { appModel } from '@/utils/appModel';
import { styles } from './styles';
import { rem } from '@kid-ui/krn/lib/utils';

export const NavigationLeftBack = memo(() => {
    const navigation = useNavigation();
    const onPress = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            // @ts-ignore
            const { liveId } = getInitData();
            closePage(appModel.instance.rootTag, !!liveId);
        }
    };
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                <KidIcon
                    kid={'common_base_return_24'}
                    size={rem(24)}
                    style={styles.iconStyle}
                />
            </View>
        </TouchableWithoutFeedback>
    );
});

export const NavigationRightClose = memo(() => {
    const navigation = useNavigation();
    const onPress = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            // @ts-ignore
            const { liveId } = getInitData();
            closePage(appModel.instance.rootTag, !!liveId);
        }
    };
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={onPress}
            style={styles.navBarContainerNew}
        >
            <KidIcon
                kidColor={'#22222233'}
                size={rem(24)}
                kid={'local_life_locallife_tanchuang_close_24'}
            />
        </TouchableOpacity>
    );
});
