import * as React from 'react';
import { shallow } from 'enzyme';
import  KpiPanel  from '../components/KpiWrapper';


describe('Test kpi panel', () => {

	const panel = shallow(<KpiPanel><div className='child'>Test child</div></KpiPanel>);

	it('Kpi panel to have children', () => {
		expect(panel).toHaveLength(1)
	});

	it('Kpi panel to have child text', () => {
		expect(panel.find('div').text()).toBe('Test child')
	});

});
