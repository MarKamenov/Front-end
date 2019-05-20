import 'jsdom-global/register';
import * as React from 'react';
import { shallow } from 'enzyme';
import App from '.././App';

describe('Check if App rendered', () => {
	const wrapper = shallow(<App />);
it('renders App', () => {
expect(wrapper).toHaveLength(1)
	});
});
