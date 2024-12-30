import { EStyleUtil } from '@/utils/EStyleUtil';

export const styles = EStyleUtil.create({
    indicatorStyle: {
        height: 2,
        width: 18,
        backgroundColor: '#000',
        bottom: 0,
    },
    tabItemStyle: {
        paddingBottom: 0,
        paddingTop: 0,
        height: 34,
    },
    tabItemActiveStyle: {
        color: '#000',
        fontSize: 16,
        fontWeight: '500',
    },
    tabItemTextStyle: {
        color: '#666',
        fontSize: 16,
        fontWeight: '400',
    },
    rightContainer: {
        width: 36,
        height: 36,
        justifyContent: 'center',
        marginRight: 11,
        alignItems: 'center',
    },
    rightInfo: {
        width: 24,
        height: 24,
        tintColor: '#0E0E0E',
    },
    loading: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
    },
    loadingAndEmptyView: {
        backgroundColor: '#f8f8f8',
    },
});
