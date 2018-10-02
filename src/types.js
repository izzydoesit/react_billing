// @flow

export type StatusType = 'pending' | 'paid' | 'overdue' | 'outstanding';

export type BillType = {
  id: string,
  dueDate: string,
  amountInCents: number,
  status: StatusType,
};

export type BillsType = {
  [id: string]: BillType,
};
