import { CommonModule } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  map,
  Subject,
  Subscription,
} from 'rxjs';
import { TransactionsService } from '../../../../../../services/transactions.service';
import { PanelHeaderComponent } from '../../../../../shared/panel-header/panel-header.component';
import { TransactionItemComponent } from './components/transaction-item/transaction-item.component';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [PanelHeaderComponent, TransactionItemComponent, CommonModule],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss',
})
export class TransactionListComponent implements OnInit, OnDestroy {
  private transactionService = inject(TransactionsService);

  transactions = this.transactionService.transactions;
  updateNotify$ = this.transactionService.updateNotify$;

  nameDebouce = new Subject<string>();
  name = new BehaviorSubject<string>('');
  sort_by = new BehaviorSubject<'date' | 'beneficiary' | 'amount'>('date');
  sort_order = new BehaviorSubject<'asc' | 'desc'>('desc');
  subs = new Subscription();

  sortArrow = this.sort_order.pipe(
    map((order) =>
      order === 'asc' ? 'fa-solid fa-arrow-up' : 'fa-solid fa-arrow-down'
    )
  );

  ngOnInit() {
    this.subs.add(
      this.nameDebouce
        .pipe(debounceTime(400))
        .subscribe((res) => this.name.next(res))
    );

    this.subs.add(
      combineLatest([
        this.name,
        this.sort_by,
        this.sort_order,
        this.updateNotify$,
      ]).subscribe(([name, sortBy, sortOrder]) =>
        this.sendRequest(name, sortBy, sortOrder)
      )
    );

    this.sendRequest(
      this.name.value,
      this.sort_by.value,
      this.sort_order.value
    );
  }

  sendRequest(
    name: string,
    sortBy: 'date' | 'beneficiary' | 'amount',
    sortOrder: 'asc' | 'desc'
  ) {
    let httpParams = new HttpParams();

    name ? (httpParams = httpParams.set('name', name)) : 0;
    sortBy ? (httpParams = httpParams.set('sort_by', sortBy)) : 0;
    sortOrder ? (httpParams = httpParams.set('sort_order', sortOrder)) : 0;

    this.transactionService.getTransactions(httpParams);
  }

  performSearch(event: any) {
    this.nameDebouce.next(event.target.value);
  }

  updateSort(sort: 'date' | 'beneficiary' | 'amount') {
    if (this.sort_by.value === sort) {
      this.toggleOrder();
    } else {
      this.sort_by.next(sort);
    }
  }

  toggleOrder() {
    const current = this.sort_order.value;
    this.sort_order.next(current === 'asc' ? 'desc' : 'asc');
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
