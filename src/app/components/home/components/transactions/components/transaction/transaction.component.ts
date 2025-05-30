import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import {
  Transaction,
  Transaction_status,
} from '../../../../../../models/transactions.models';
import { TransactionsService } from '../../../../../../services/transactions.service';
import { PanelHeaderComponent } from '../../../../../shared/panel-header/panel-header.component';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [PanelHeaderComponent, CommonModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss',
})
export class TransactionComponent implements OnInit {
  private transactionService = inject(TransactionsService);

  id = input<string>();

  transaction = signal<Transaction | null>(null);
  showDropdown = signal<boolean>(false);

  ngOnInit(): void {
    this.loadTransaction();
  }

  loadTransaction() {
    if (this.id()) {
      this.transactionService
        .getTransaction(this.id()!)
        .pipe(catchError(() => of(null)))
        .subscribe((res) => {
          this.transaction.set(res);
        });
    }
  }

  toggleDropdown() {
    this.showDropdown.set(!this.showDropdown());
  }

  selectStatus(status: Transaction_status) {
    const transaction = this.transaction();

    if (transaction) {
      transaction.status = status;

      this.transactionService
        .updateTransaction(this.id()!, transaction)
        .pipe(
          tap(() => this.showDropdown.set(false)),
          catchError(() => of(null))
        )
        .subscribe((res) => this.transaction.set(res));
    }
  }
}
