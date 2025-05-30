import { Component } from '@angular/core';
import { CreateTransactionComponent } from './components/create-transaction/create-transaction.component';
import { TransactionsComponent } from './components/transactions/transactions.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TransactionsComponent, CreateTransactionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
