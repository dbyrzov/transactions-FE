import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { MAIN_PATHS } from '../../../../../../../../app.routes';
import { Transaction } from '../../../../../../../../models/transactions.models';

@Component({
  selector: 'app-transaction-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-item.component.html',
  styleUrl: './transaction-item.component.scss',
})
export class TransactionItemComponent {
  private router = inject(Router);

  item = input.required<Transaction>();

  navigate() {
    this.router.navigate([`${MAIN_PATHS.TRANSACTIONS}/${this.item().id}`]);
  }
}
