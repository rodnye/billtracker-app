import { Component, inject, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { TransactionService } from '../../../services/transaction.service';
import { Transaction } from '../../../models/transaction';

@Component({
  selector: 'add-transaction-dialog',
  templateUrl: './add-transaction.dialog.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatRadioModule,
    ReactiveFormsModule,
  ],
  standalone: true,
})
export class AddTransactionDialogComponent {
  readonly dialogRef = inject(MatDialogRef);
  readonly trService = inject(TransactionService);

  // events
  readonly submit =
    output<Parameters<typeof TransactionService.prototype.addTrans>[0]>();

  // signals
  readonly form = new FormGroup({
    amount: new FormControl<Transaction['amount']>(0, Validators.min(1)),
    flow: new FormControl<Transaction['flow']>('in'),
    typeId: new FormControl<Transaction['typeId']>('', Validators.required),
    info: new FormControl<Transaction['info']>('', Validators.maxLength(50)),
  });

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.submit.emit({
      amount: this.form.get('amount')?.value!,
      typeId: this.form.get('typeId')?.value!,
      flow: this.form.get('flow')?.value!,
      info: this.form.get('info')?.value!,
    });

    this.dialogRef.close();
  }
}
