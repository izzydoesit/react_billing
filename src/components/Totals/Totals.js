// @flow 

import React, { Component } from 'react';
import {
  isToday,
  isPastDate,
  isFutureDate,
  formatCentsToDollars } from 'clark-utils';
import type { BillsType } from '../../types'
import './Totals.css';

type Props = {
  bills: BillsType,
};

export default class Totals extends Component<Props> {
  static defaultProps = {
    bills: {}
  }

  calculateTotals = (bills: BillsType): string => {
    let total = 0, paid = 0, overdue = 0, outstanding = 0;

    for (let key in bills) {
      
      const bill = bills[key];
      const billDueDate = bill['dueDate'];

      if (bill && (bill['status'] === 'pending' && isPastDate(billDueDate))) {
        overdue += bill['amountInCents'];
      } else if (bill['status'] === 'pending' && (isToday(billDueDate) || isFutureDate(billDueDate))) {
        outstanding += bill['amountInCents'];
      } else if (bill['status'] === 'paid') {
        paid += bill['amountInCents'];
      } 
    };

    total = (paid + overdue + outstanding);

    return { total, paid, overdue, outstanding};
  }

  render() {
      const bills = this.props.bills;
      const { total,
              paid, 
              overdue, 
              outstanding} = this.calculateTotals(bills)


    return (
      <div className="totals-wrapper">
        <p className="all-total">Total: <span className="number-total">{formatCentsToDollars(total)}</span></p>
        <p className="paid-total success">Paid: <span className="number-total">{formatCentsToDollars(paid)}</span></p>
        <p className="overdue-total danger">Overdue: <span className="number-total">{formatCentsToDollars(overdue)}</span></p>
        <p className="outstanding-total pending">Outstanding: <span className="number-total">{formatCentsToDollars(outstanding)}</span></p>
      </div>
    )
  }
}
