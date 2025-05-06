import { inject, Pipe, PipeTransform } from '@angular/core';
import { Transaction } from '../models/transaction';
import { TransactionService } from '../services/transaction.service';

/**
 * Get the icon name of a Transaction
 */
@Pipe({ name: 'transactionIcon', standalone: true })
export class TransactionIconPipe implements PipeTransform {
  readonly trService = inject(TransactionService);
  
  transform(value: Transaction) {
    return this.trService.getType(value.typeId)!.icon;
  }
}
