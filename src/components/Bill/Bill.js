// @flow

import React from 'react';
import './Bill.css';

type Props = {
  id: string,
  status: string,
  amount: string,
  dueDate: string,
}

const Bill = (props: Props) => {

  const {
    id,
    status,
    amount,
    dueDate } = props;

  return <li className="bill-item">
            <span className="bill-id">{id}: </span> 
            <span className="bill-amount">{amount}, </span> 
            <span className="bill-status">{status}, </span> 
            <span className="bill-due-date">{dueDate}</span>
          </li>
}

export default Bill;
