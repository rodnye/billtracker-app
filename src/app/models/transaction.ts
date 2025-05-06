export interface GlobalSummary {
  inflowTypes: TransactionType[];
  outflowTypes: TransactionType[];
  summaries: TransactionSummary[];
}

export interface TransactionType {
  id: string;
  name: string;
  flow: 'in' | 'out';
  
  /** material icon name */
  icon?: string;
}

export interface Transaction {
  id: string;
  date: number;
  amount: number;
  info?: string;
  typeId: TransactionType['id'];
  flow: TransactionType['flow'];
}

export interface TransactionSummary {
  id: string;
  date: number;
  inflow: number;
  outflow: number;
  transactions: Transaction[];
}
