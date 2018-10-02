// @flow 

import React, { Component } from 'react';
import Bill from '../Bill/Bill';
import {
  isToday,
  isPastDate,
  isFutureDate,
  formatCentsToDollars } from 'clark-utils';
import type { BillType, BillsType } from '../../types'
import './BillList.css';

type Props = {
  bills?: BillsType,
};

export default class BillList extends Component<Props> {
  static defaultProps = {
    bills: {}
  }

  extractGroup = (groupName: string): Array<BillType> => {
    const bills = this.props.bills;
    let groupList = [];

    if (groupName === 'paid') {
      for (let key in bills) {
        const bill = bills[key];
        if (bill['status'] === 'paid') {
          const billCopy = { ...bill };
          groupList.push(billCopy);
        }
      };
    } else {
      if (groupName === 'outstanding') {
        for (let key in bills) {
          const bill = bills[key];
          if (bill['status'] === 'pending' && (isToday(bill['dueDate']) || isFutureDate(bill['dueDate']))) {
            const billCopy = { ...bill };
            groupList.push(billCopy);
            groupList[groupList.length-1]['status'] = 'outstanding';
          }
        };
      } else if (groupName === 'overdue') {
        for (let key in bills) {
          const bill = bills[key];
          if (bill['status'] === 'pending' && isPastDate(bill['dueDate'])) {
            const billCopy = { ...bill };
            groupList.push(billCopy);
            groupList[groupList.length-1]['status'] = 'overdue';
          }
        };
      }
    }

    return groupList;
  }

  sortGroup = (group: Array<BillType>): Array<BillType> => {
    return group.sort((a, b) => { 
      return (a.dueDate < b.dueDate) ? 1 : ((b.dueDate > a.dueDate) ? -1 : 0);
    });
  }

  render() {
    const paid = this.sortGroup(this.extractGroup('paid'));
    const outstanding = this.sortGroup(this.extractGroup('outstanding'));
    const overdue = this.sortGroup(this.extractGroup('overdue'));
    const sortedBills = [...outstanding, ...overdue, ...paid]

    return (
      <div className="bill-list-wrapper">
        <ul className="bill-list">
          {sortedBills.length === 0
          ? <li className="empty-list-item">No bills have been created...</li>
          : sortedBills.map((bill, index) =>
            <Bill
              key={index}
              id={bill.id}
              status={bill.status}
              amount={formatCentsToDollars(bill.amountInCents)}
              dueDate={bill.dueDate}
            />
          )}
        </ul>
      </div>
    )
  }
}
