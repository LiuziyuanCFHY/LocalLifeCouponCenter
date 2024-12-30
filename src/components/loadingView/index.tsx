import React from 'react';
import { View, ViewStyle } from 'react-native';
import { KidLoading } from '@kid-ui/krn';
import { styles } from '@/components/loadingView/styles';

interface LoadingStateProp {
    containerStyle?: ViewStyle | Array<ViewStyle | object> | object;
}

export const LoadingStateView = ({ containerStyle }: LoadingStateProp) => {
    return (
        <View style={[styles.container, containerStyle && containerStyle]}>
            <KidLoading />
        </View>
    );
};
