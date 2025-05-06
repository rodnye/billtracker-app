import { inject, Pipe, PipeTransform } from '@angular/core';
import { Transaction } from '../models/transaction';
import { TransactionService } from '../services/transaction.service';
import { CurrencyPipe } from '@angular/common';

/**
 * Get the name of a Transaction
 */
@Pipe({ name: 'transactionType', standalone: true })
export class TransactionTypePipe implements PipeTransform {
  readonly trService = inject(TransactionService);

  transform(value: Transaction) {
    return this.trService.getType(value.typeId)!.name;
  }
}

