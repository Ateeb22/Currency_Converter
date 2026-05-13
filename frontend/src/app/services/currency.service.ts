import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Currency, ConversionResult } from '../models/currency.model';
import { environment } from '../../environments/environment';

const API = `${environment.apiUrl}/currency`;

@Injectable({ providedIn: 'root' })
export class CurrencyService {
  constructor(private http: HttpClient) {}

  getCurrencies(): Observable<Record<string, Currency>> {
    return this.http.get<Record<string, Currency>>(`${API}/list`);
  }

  convert(from: string, to: string, amount: number): Observable<ConversionResult> {
    return this.http.get<ConversionResult>(`${API}/convert`, {
      params: { from, to, amount: amount.toString() },
    });
  }

  historical(from: string, to: string, amount: number, date: string): Observable<ConversionResult> {
    return this.http.get<ConversionResult>(`${API}/historical`, {
      params: { from, to, amount: amount.toString(), date },
    });
  }
}
