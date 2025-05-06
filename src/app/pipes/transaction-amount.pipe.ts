import { inject, Pipe, PipeTransform } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../models/transaction';
import { CurrencyPipe } from '@angular/common';

@Pipe({ name: 'transactionAmount', standalone: true })
export class TransactionAmountPipe implements PipeTransform {
  readonly trService = inject(TransactionService);
  readonly currencyPipe = inject(CurrencyPipe);

  transform(value: Transaction) {
    return (
      (value.flow === 'in' ? '+ ' : '- ') +
      this.currencyPipe.transform(value.amount, 'CUP', 'symbol', '1.2-2')
    );
  }
}
