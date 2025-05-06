import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { TransactionService } from '../../services/transaction.service';
import { TransactionSummary, TransactionType } from '../../models/transaction';
import { FriendlyTimePipe } from '../../pipes/friendly-time.pipe';
import { TransactionTypePipe } from '../../pipes/transaction-type.pipe';
import { TransactionAmountPipe } from '../../pipes/transaction-amount.pipe';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { TransactionIconPipe } from '../../pipes/transaction-icon.pipe';
import { AddTransactionDialogComponent } from './add-transaction/add-transaction.dialog';
import { MatDialog } from '@angular/material/dialog';
import { AutoAnimateDirective } from '../../directives/auto-animate.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    FriendlyTimePipe,
    TransactionTypePipe,
    TransactionIconPipe,
    TransactionAmountPipe,
    AutoAnimateDirective,
  ],
  templateUrl: './home.component.html',
  styles: ``,
  providers: [DatePipe, CurrencyPipe],
})
export class HomeComponent implements OnInit {
  summaries!: TransactionSummary[];

  // services
  private trService = inject(TransactionService);
  private dialogService = inject(MatDialog);

  ngOnInit() {
    this.trService.summaries$.subscribe((summaries) => {
      this.summaries = summaries;
    });
  }

  openAddTransaction() {
    const dialogRef = this.dialogService.open(AddTransactionDialogComponent);

    dialogRef.componentInstance.submit.subscribe((transactionValue) => {
      this.trService.addTrans(transactionValue);
      console.log('suscribe wanwan', transactionValue);
    });
  }
}
