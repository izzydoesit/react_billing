// @flow

import React from 'react';
import BillList from '../components/BillList/BillList';
import billData from '../data';
import {
  isToday,
  isPastDate,
  isFutureDate, } from 'clark-utils';
import { mount, configure } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('<BillList />', () => {
  let props, list;
  let mountedBillList;
  const billList = () => {
    if (!mountedBillList) {
      mountedBillList = mount(<BillList {...props} />);
    }
    return mountedBillList;
  };

  beforeEach(() => {
    props = {
      bills: {}
    }
    mountedBillList = undefined;
  });

  it('renders correctly', () => {
    expect(shallowToJson(billList())).toMatchSnapshot();
  });

  it('renders a <div> element', () => {
    expect(billList().find('div.bill-list-wrapper').length).toEqual(1);
  });

  it('renders one <ul> element', () => {
    expect(billList().find('ul.bill-list').length).toEqual(1);
  });

  describe('when bills is defined', () => {
    beforeEach(() => {
      props.bills = billData;
      list = billList().find('ul.bill-list').children();
    });

    it('renders a list of bills', () => {
      const numberOfBills = Object.keys(billData).length;
      expect(list.length).toEqual(numberOfBills);
    });

    it('groups paid bills by status', () => {
      const allPaidBills = Object.keys(billData).filter((key) => {
        const bill = billData[key];
        return bill['status'] === 'paid';
      });
      const lastFourBills = list.slice(-4);
      lastFourBills.forEach((bill) => {
        const billStatus = bill.find('span.bill-status').text();
        expect(billStatus).toContain('paid');
      });
      expect(allPaidBills.length).toEqual(lastFourBills.length);
    });

    it('sorts paid bills by due date', () => {
      const lastFourBills = list.slice(-4);
      let previousBillDueDate = new Date(lastFourBills.first().find('span.bill-due-date').text()).getTime();
      for (let i = 1; i < lastFourBills.length; i++) {
        const currentBillDueDate = new Date(lastFourBills.at(i).find('span.bill-due-date').text()).getTime();
        expect(currentBillDueDate).toBeLessThan(previousBillDueDate);
      }
    });

    it('groups overdue bills by status and due date', () => {
      const allOverdueBills = Object.keys(billData).filter((key) => {
        const bill = billData[key];
        return bill['status'] !== 'paid' && isPastDate(bill['dueDate']);
      });
      const middleThreeBills = list.slice(2, 5);
      middleThreeBills.forEach((bill) => {
        const billStatus = bill.find('span.bill-status').text();
        expect(billStatus).toContain('overdue');
      })
      expect(allOverdueBills.length).toEqual(middleThreeBills.length);
    });

    it('sorts overdue bills by due date', () => {
      const middleThreeBills = list.slice(2, 5);
      let previousBillDueDate = new Date(middleThreeBills.first().find('span.bill-due-date').text()).getTime();
      for (let i = 1; i < middleThreeBills.length; i++) {
        const currentBillDueDate = new Date(middleThreeBills.at(i).find('span.bill-due-date').text()).getTime();
        expect(currentBillDueDate).toBeLessThan(previousBillDueDate);
      }
    });

    it('groups outstanding bills by status and due date', () => {
      const allOutstandingBills = Object.keys(billData).filter((key) => {
        const bill = billData[key];
        return bill['status'] !== 'paid' && (isToday(bill['dueDate']) || isFutureDate(bill['dueDate']));
      });
      const firstTwoBills = list.slice(0, 2);
      firstTwoBills.forEach((bill) => {
        const billStatus = bill.find('span.bill-status').text();
        expect(billStatus).toContain('outstanding');
      });
      expect(allOutstandingBills.length).toEqual(firstTwoBills.length);
    });

    it('sorts outstanding bills by due date', () => {
      const firstTwoBills = list.slice(0, 2);
      let previousBillDueDate = new Date(firstTwoBills.first().find('span.bill-due-date').text()).getTime();
      for (let i = 1; i < firstTwoBills.length; i++) {
        const currentBillDueDate = new Date(firstTwoBills.at(i).find('span.bill-due-date').text()).getTime();
        expect(currentBillDueDate).toBeLessThan(previousBillDueDate);
      }
    });
  });

  describe('when bills is empty', () => {
    beforeEach(() => {
      props.bills = {};
      list = billList().find('ul.bill-list').children();
    });

    it('renders one list item with a "No bills..." message', () => {
      expect(list.length).toEqual(1);
      expect(list.first().text()).toEqual("No bills have been created...")
    });
  });
});
