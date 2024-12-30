import { invoke } from '@kds/bridge-lite';

interface IAbConfig<T> {
    name: string;
    type: 'bool' | 'number';
    stateKey: T;
    defaultValue: boolean | number;
}

function defineConfigs<T extends string>(configs: Array<IAbConfig<T>>) {
    return configs;
}

export const abConfigs = defineConfigs([]);

type AbConfigDefaultValues = Record<
    (typeof abConfigs)[number]['stateKey'],
    (typeof abConfigs)[number]['defaultValue']
>;

export const initialAb = abConfigs.reduce((acc, cur) => {
    return {
        ...acc,
        [cur.stateKey]: cur.defaultValue,
    };
}, {}) as AbConfigDefaultValues;

export const abPromises =
    abConfigs.length > 0
        ? abConfigs.map((item) => {
              return invoke('tool.getABTestInfo', {
                  type: item.type,
                  key: item.name,
              });
          })
        : undefined;
