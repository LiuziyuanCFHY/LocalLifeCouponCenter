import { invoke } from '@kds/bridge-lite';

interface ISwitchConfig<T> {
    name: string;
    stateKey: T;
    defaultValue: boolean | number | string | object;
}

function defineConfigs<T extends string>(configs: Array<ISwitchConfig<T>>) {
    return configs;
}

export const switchConfigs = defineConfigs([]);

type AbConfigDefaultValues = Record<
    (typeof switchConfigs)[number]['stateKey'],
    (typeof switchConfigs)[number]['defaultValue']
>;

export const initialSwitch = switchConfigs.reduce((acc, cur) => {
    return {
        ...acc,
        [cur.stateKey]: cur.defaultValue,
    };
}, {}) as AbConfigDefaultValues;

export const switchPromise =
    switchConfigs.length > 0
        ? invoke('tool.getKswitchData', {
              keys: switchConfigs.map((item) => {
                  return { key: item.name };
              }),
          })
        : undefined;
