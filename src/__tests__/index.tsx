import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../index';

test('App normal render', () => {
    const { toJSON } = render(<App />);
    expect(toJSON()).toMatchSnapshot(); // 匹配快照
});
