import { Injectable } from '@angular/core';
import {
  GlobalSummary,
  Transaction,
  TransactionSummary,
  TransactionType,
} from '../models/transaction';
import { dateToDDMMYY } from '../utils/date';
import { createMockSumary } from './_mock-sumaries';
import { BehaviorSubject } from 'rxjs';
import { NotFoundError } from '../models/error';
import { generateId } from '../utils/random';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private data: GlobalSummary = {
    summaries: [],
    inflowTypes: [],
    outflowTypes: [],
  };

  // subjects
  private summariesSubject = new BehaviorSubject<TransactionSummary[]>(
    this.data.summaries,
  );
  private inflowTypesSubject = new BehaviorSubject<TransactionType[]>(
    this.data.inflowTypes,
  );
  private outflowTypesSubject = new BehaviorSubject<TransactionType[]>(
    this.data.outflowTypes,
  );

  // observables
  summaries$ = this.summariesSubject.asObservable();
  inflowTypes$ = this.inflowTypesSubject.asObservable();
  outflowTypes$ = this.outflowTypesSubject.asObservable();

  constructor() {
    this.initDB();
  }

  private initDB() {
    // TODO: implements a database loader for store information
    this.data = createMockSumary();
    this.emitChanges();
  }

  private emitChanges() {
    this.summariesSubject.next(this.data.summaries);
    this.inflowTypesSubject.next(this.data.inflowTypes);
    this.outflowTypesSubject.next(this.data.outflowTypes);
  }

  getType(id: string) {
    return this.data.inflowTypes
      .concat(this.data.outflowTypes)
      .find((type) => type.id === id);
  }

  getTypes(flow: Transaction['flow']) {
    return flow == 'in' ? this.inflowTypes : this.outflowTypes;
  }

  // CRUD
  /**
   * Add or update a transaction type
   */
  addType(type: TransactionType) {
    if (type.flow == 'in') {
      this.data.inflowTypes.push(type);
      this.inflowTypesSubject.next(this.data.inflowTypes);
    } else {
      this.data.outflowTypes.push(type);
      this.outflowTypesSubject.next(this.data.outflowTypes);
    }
  }

  deleteType(id: string) {
    const type = this.getType(id);
    if (!type) throw new NotFoundError(`The type ${id} not found.`);

    let types: TransactionType[];
    let typesSubject: BehaviorSubject<TransactionType[]>;

    if (type.flow == 'in') {
      types = this.data.inflowTypes;
      typesSubject = this.inflowTypesSubject;
    } else {
      types = this.data.outflowTypes;
      typesSubject = this.outflowTypesSubject;
    }

    let index = types.findIndex((current) => current.id == type.id);
    types.splice(index, 1);
    typesSubject.next(types);

    return type;
  }

  /**
   * Add a transaction to a summary (if summary doesn't exists, create one)
   */
  addTrans(tr: Omit<Transaction, 'id' | 'date'>) {
    let date = new Date();
    let summaryId = dateToDDMMYY(date);
    let summary = this.data.summaries.find((s) => s.id === summaryId);

    if (!summary) {
      summary = {
        id: summaryId,
        date: date.getTime(),
        inflow: 0,
        outflow: 0,
        transactions: [],
      };
      this.data.summaries.unshift(summary);
    }

    summary.inflow += tr.flow === 'in' ? tr.amount : 0;
    summary.outflow += tr.flow === 'out' ? tr.amount : 0;
    summary.transactions.unshift({
      id: generateId('t-'),
      date: date.getTime(),
      ...tr,
    });
    this.emitChanges();
  }

  // getters
  get summaries() {
    return this.data.summaries;
  }
  get inflowTypes() {
    return this.data.inflowTypes;
  }
  get outflowTypes() {
    return this.data.outflowTypes;
  }
}
