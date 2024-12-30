import { useState } from 'react';
import { isEmptyArray } from '@locallife/utils';
import { abConfigs, abPromises, initialAb } from '@/constants/abConfigs';
import {
    initialSwitch,
    switchConfigs,
    switchPromise,
} from '@/constants/switchConfigs';
import { useMount } from '@locallife/base-hooks';

export const useAbKswitchInit = () => {
    const [ab, setAb] = useState(initialAb);
    const [kSwitch, setKSwitch] = useState(initialSwitch);
    useMount(() => {
        if (!isEmptyArray(abPromises)) {
            Promise.all(abPromises!)
                .then((res) => {
                    console.log(
                        'updateAb 初始值：',
                        initialAb,
                        '接口下发res：',
                        res,
                    );
                    const _ab = {};
                    abConfigs.forEach((item, index) => {
                        _ab[item.stateKey] =
                            res[index]?.value ?? item.defaultValue;
                    });
                    setAb((prevState) => {
                        const result = {
                            ...prevState,
                            ..._ab,
                        };
                        console.log('updateAb 结果：', result);
                        return result;
                    });
                })
                .catch();
        }
        switchPromise
            ?.then((res) => {
                console.log(
                    'updateSwitch 初始值：',
                    initialSwitch,
                    '接口下发res：',
                    JSON.stringify(res),
                );
                const _kswitch = {};
                switchConfigs.forEach((item, index) => {
                    const data = res?.data?.[index];
                    if (item?.name === data?.key) {
                        _kswitch[item.stateKey] = data.value as boolean;
                    }
                });
                setKSwitch((prevState) => {
                    const result = {
                        ...prevState,
                        ..._kswitch,
                    };
                    console.log('updateSwitch 结果：', result);
                    return result;
                });
            })
            .catch();
    });
    return { ab, kSwitch };
};
