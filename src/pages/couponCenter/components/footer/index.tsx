import React from 'react';
import { UseInfiniteQueryResult } from 'react-query';
import { KidLoading } from '@kid-ui/krn';
import { Platform, View } from 'react-native';
import { styles } from '@/pages/couponCenter/components/footer/styles';
import { StaticLoading } from '@locallife/fallbackcomponents';

type IProps = {
    fetchResult: UseInfiniteQueryResult;
    customFooter?: React.ReactElement;
};

export const CouponFooter = (props: IProps) => {
    const { fetchResult, customFooter } = props;
    if (!fetchResult.data?.pages?.length || fetchResult.isError) {
        return null; // 没有数据或者有错误不展示
    }
    if (fetchResult.isFetching && !fetchResult.isFetchingNextPage) {
        return null; // 第一次加载
    }
    if (fetchResult.isFetchingNextPage) {
        return (
            <View style={styles.footer}>
                <KidLoading />
            </View>
        );
    }
    if (!fetchResult.hasNextPage) {
        if (customFooter) {
            return customFooter;
        }
        return (
            <View
                style={{
                    flexGrow: 1,
                    justifyContent: 'flex-end',
                }}
            >
                <StaticLoading
                    containerStyle={{
                        width: '100%', // 任何场景高度固定 142，业务不用自己设置
                        height: 92,
                        marginBottom: Platform.OS == 'ios' ? 34 : 4,
                    }}
                />
            </View>
        );
    }
    return null;
};
