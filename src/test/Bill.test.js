// @flow

import React from 'react';
import Bill from '../components/Bill/Bill';
import { formatCentsToDollars } from 'clark-utils';
import { mount, configure } from 'enzyme';
import { mountToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('<Bill />', () => {
  let props, billText;
  let mountedBill;
  const bill = () => {
    if (!mountedBill) {
      mountedBill = mount(<Bill {...props} />);
    }
    return mountedBill;
  };

  beforeEach(() => {
    props = {
      id: undefined,
      status: undefined,
      amount: undefined,
      dueDate: undefined,
    }
    mountedBill = undefined;
  });

  it('renders correctly', () => {
    expect(mountToJson(bill())).toMatchSnapshot();
  });

  it('renders an <li> element', () => {
    expect(bill().find('li.bill-item').length).toEqual(1);
  });

  describe('when id is defined', () => {
    beforeEach(() => {
      props.id = 'myKey';
      billText = bill().text();
    });

    it('renders an id', () => {
      expect(billText).toContain(props.id);
    });
  });
 
  describe('when status is defined', () => {
    beforeEach(() => {
      props.status = 'some status';
      billText = bill().text();
    });

    it('renders a status', () => {
      expect(billText).toContain(props.status);
    });
  });
 
  describe('when amount is defined', () => {
    beforeEach(() => {
      props.amount = formatCentsToDollars(12345);
      billText = bill().text();
    });

    it('renders an amount', () => {
      expect(billText).toContain(props.amount);
    });
  });
 
  describe('when dueDate is defined', () => {
    beforeEach(() => {
      props.dueDate = '2000-01-01';
      billText = bill().text();
    });

    it('renders a due date', () => {
      expect(billText).toContain(props.dueDate);
    });
  });
});
