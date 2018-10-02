// @flow

import React from 'react';
import Totals from '../components/Totals/Totals';
import billData from '../data';
import { mount, configure } from 'enzyme';
import { mountToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('<Totals />', () => {
  let props, list;
  let mountedTotals;
  const totals = () => {
    if (!mountedTotals) {
      mountedTotals = mount(<Totals {...props} />);
    }
    return mountedTotals;
  };

  beforeEach(() => {
    props = {
      bills: {}
    }
    mountedTotals = undefined;
  });

  it('renders correctly', () => {
    expect(mountToJson(totals())).toMatchSnapshot();
  });

  it('renders a <div> element', () => {
    expect(totals().find('div.totals-wrapper').length).toEqual(1);
  });

  it('renders a Total <p> element', () => {
    expect(totals().find('p.all-total').length).toEqual(1);
    expect(totals().find('p.all-total').text()).toContain('Total:');
  });

  it('renders a Paid <p> element', () => {
    expect(totals().find('p.paid-total').length).toEqual(1);
    expect(totals().find('p.paid-total').text()).toContain('Paid:');
  });

  it('renders an Overdue <p> element', () => {
    expect(totals().find('p.overdue-total').length).toEqual(1);
    expect(totals().find('p.overdue-total').text()).toContain('Overdue:');
  });

  it('renders an Outstanding <p> element', () => {
    expect(totals().find('p.outstanding-total').length).toEqual(1);
    expect(totals().find('p.outstanding-total').text()).toContain('Outstanding:');
  });

  describe('when bills is defined', () => {
    beforeEach(() => {
      props.bills = billData;
    });

    it('renders a total of all bill amounts', () => {
      expect(totals().find('p.all-total > span.number-total').text()).toEqual('$16,989.55');
    });

    it('renders a total of all paid bill amounts', () => {
      expect(totals().find('p.paid-total > span.number-total').text()).toEqual('$1,779.23');
    });

    it('renders a total of all outstading bill amounts', () => {
      expect(totals().find('p.overdue-total > span.number-total').text()).toEqual('$6,305.42');
    });

    it('renders a total of all overdue bill amounts', () => {
      expect(totals().find('p.outstanding-total > span.number-total').text()).toEqual('$8,904.90');
    });
  });
});
