import { EStyleUtil } from '@/utils/EStyleUtil';

export const styles = EStyleUtil.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    listContainer: {
        paddingTop: 14,
        paddingHorizontal: 12,
        flexGrow: 1,
    },
    sceneStatusStyle: {
        paddingTop: 14,
        position: 'absolute',
        height: '100%',
        width: '100%',
    },
    sceneEmptyView: {
        height: 524,
    },
    footer: {
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemMargin: { marginBottom: 10 },
});
