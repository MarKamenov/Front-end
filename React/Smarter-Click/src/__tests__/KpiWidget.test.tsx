import * as React from 'react';
import { shallow } from 'enzyme';
import  KpiPanel  from '../components/KpiWrapper';


describe('Test checkbox', () => {

	const panel = shallow(<KpiPanel><div className='child'>Test child</div></KpiPanel>);

	it('Kpi panel to have children', () => {
		expect(panel).toHaveLength(1)
	});

	it('Kpi panel to have children', () => {
		expect(panel.find('div').text()).toBe('Test child')
	});

	// it('Kpi panel child to have classsName', () => {
	// 	expect(panel.contains(<div className="child" />)).to.equal(true);
	// });

});
