import * as React from 'react';
import { shallow } from 'enzyme';
import  NavBar  from '../components/NavBar';


describe('Test navbar', () => {
	const nav = shallow(<NavBar />);

	it('Check if navbar exists', () => {
		expect(nav).toHaveLength(1)
	});

});
