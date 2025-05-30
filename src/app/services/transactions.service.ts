import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { buildApi } from '../core/auth/auth.constants';
import { Transaction } from '../models/transactions.models';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private http = inject(HttpClient);

  transactions = signal<Transaction[]>([]);
  updateNotify$ = new Subject<void>();

  notify() {
    this.updateNotify$.next();
  }

  getTransactions(params?: HttpParams) {
    return this.http
      .get<Transaction[]>(buildApi('transactions'), {
        withCredentials: true,
        params: params,
      })
      .pipe(tap((x) => this.transactions.set(x)))
      .subscribe();
  }

  getTransaction(id: string) {
    return this.http.get<Transaction>(buildApi(`transactions/${id}`), {
      withCredentials: true,
    });
  }

  createTransaction(data: Transaction) {
    return this.http.post(buildApi('transactions'), data, {
      withCredentials: true,
    });
  }

  updateTransaction(id: string, data: Transaction) {
    return this.http.patch<Transaction>(buildApi(`transactions/${id}`), data, {
      withCredentials: true,
    });
  }
}
