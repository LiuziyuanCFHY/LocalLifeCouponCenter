import { EStyleUtil } from '@/utils/EStyleUtil';

export const styles = EStyleUtil.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    back: {
        position: 'absolute',
        top: 34,
        left: 20,
    },
    backImg: {
        width: 36,
        height: 36,
    },
    upgrade: {
        width: 80,
        height: 80,
        marginBottom: 16,
    },
    text: {
        fontSize: 16,
        marginBottom: 20,
    },
});
