/* eslint-disable no-undef */
import RN from 'react-native';
// include this line for mocking react-native-gesture-handler
import 'react-native-gesture-handler/jestSetup';

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

// mock Animate Component to normal Component
jest.spyOn(RN.Animated, 'ScrollView', 'get').mockImplementation(
    () => RN.ScrollView,
);

jest.spyOn(RN.Animated, 'View', 'get').mockImplementation(() => RN.View);

jest.spyOn(RN.Animated, 'Text', 'get').mockImplementation(() => RN.Text);

jest.spyOn(RN.Animated, 'createAnimatedComponent').mockImplementation(
    (Component) => Component,
);
