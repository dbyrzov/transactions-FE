import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { tap } from 'rxjs';
import {
  Transaction,
  TRANSACTION_STATUS,
} from '../../../../models/transactions.models';
import { TransactionsService } from '../../../../services/transactions.service';
import { PanelHeaderComponent } from '../../../shared/panel-header/panel-header.component';

@Component({
  selector: 'app-create-transaction',
  standalone: true,
  imports: [PanelHeaderComponent, ReactiveFormsModule],
  templateUrl: './create-transaction.component.html',
  styleUrl: './create-transaction.component.scss',
})
export class CreateTransactionComponent {
  private transactionService = inject(TransactionsService);

  transactionForm = this.buildForm();

  submit() {
    if (this.transactionForm.valid) {
      const request = {
        ...this.transactionForm.getRawValue(),
        status: TRANSACTION_STATUS.SENT,
      } as Transaction;

      this.transactionService
        .createTransaction(request)
        .pipe(
          tap(() => this.transactionForm.reset()),
          tap(() => this.transactionService.notify())
        )
        .subscribe();
    }
  }

  buildForm() {
    return new FormGroup({
      sender: new FormControl<string | null>(null, [Validators.required]),
      receiver: new FormControl<string | null>(null, [Validators.required]),
      amount: new FormControl<string | null>(null, [Validators.required]),
    });
  }
}
