import { EStyleUtil } from '@/utils/EStyleUtil';
import { PixelRatio } from 'react-native';

export const styles = EStyleUtil.create({
    recoTitleContainer: {
        marginTop: 6,
        flexDirection: 'row',
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
    },
    horLine: {
        height: 1 / PixelRatio.get(),
        width: 21,
        backgroundColor: '#666666',
    },
    recoTitle: {
        color: '#666666',
        fontSize: 14,
        fontWeight: '400',
        marginHorizontal: 14,
    },
    footer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemMargin: { marginBottom: 10 },
});
