import { createContext } from 'react';
import { initialAb } from '@/constants/abConfigs';
import { initialSwitch } from '@/constants/switchConfigs';

interface IAbKswitchContext {
    ab: typeof initialAb;
    kSwitch: typeof initialSwitch;
}
export const AbKswitchContext = createContext({} as IAbKswitchContext);
