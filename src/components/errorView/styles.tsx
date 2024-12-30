import { rem } from '@kid-ui/krn/lib/utils';
import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'white',
    },
    buttonText: {
        fontFamily:
            Platform.OS === 'ios' ? 'PingFangSC-Medium' : 'sans-serif-medium',
        fontSize: rem(14),
        fontWeight: '500',
        lineHeight: rem(20),
    },
});
