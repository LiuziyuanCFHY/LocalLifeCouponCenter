import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { styles } from './styles';
import { closePage } from '@locallife/utils';
import { appModel } from '@/utils/appModel';

export const Update = () => {
    const back = () => {
        closePage(appModel.rootTag);
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.back}
                onPress={back}
                hitSlop={{ left: 15, right: 15, top: 15, bottom: 15 }}
            >
                <Image
                    source={require('@/assets/image/back.png')}
                    style={styles.backImg}
                />
            </TouchableOpacity>
            <Image
                source={require('../../assets/image/upgrade.png')}
                style={styles.upgrade}
            />
            <Text style={styles.text}>请将快手升级至最新版本</Text>
        </View>
    );
};
