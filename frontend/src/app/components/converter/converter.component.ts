import { Component, OnInit, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CurrencyService } from '../../services/currency.service';
import { HistoryService } from '../../services/history.service';
import { Currency } from '../../models/currency.model';

@Component({
  selector: 'app-converter',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatSnackBarModule,
  ],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.scss',
})
export class ConverterComponent implements OnInit {
  currencies = signal<Currency[]>([]);
  fromCurrency = signal('USD');
  toCurrency = signal('EUR');
  amount = signal<number>(1);
  historicalMode = signal(false);
  selectedDate = signal<Date | null>(null);
  maxDate = new Date();

  loading = signal(false);
  loadingCurrencies = signal(true);

  result = signal<number | null>(null);
  rate = signal<number | null>(null);

  canConvert = computed(() => {
    return this.fromCurrency() && this.toCurrency() && this.amount() > 0
      && this.fromCurrency() !== this.toCurrency()
      && (!this.historicalMode() || this.selectedDate() !== null);
  });

  constructor(
    private currencyService: CurrencyService,
    private historyService: HistoryService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.currencyService.getCurrencies().subscribe({
      next: (data) => {
        this.currencies.set(Object.values(data));
        this.loadingCurrencies.set(false);
      },
      error: () => {
        this.loadingCurrencies.set(false);
        this.snackBar.open('Failed to load currencies', 'Dismiss', { duration: 4000 });
      },
    });
  }

  swap() {
    const temp = this.fromCurrency();
    this.fromCurrency.set(this.toCurrency());
    this.toCurrency.set(temp);
    this.result.set(null);
    this.rate.set(null);
  }

  convert() {
    if (!this.canConvert()) return;

    this.loading.set(true);
    this.result.set(null);
    this.rate.set(null);

    const from = this.fromCurrency();
    const to = this.toCurrency();
    const amount = this.amount();

    const obs = this.historicalMode() && this.selectedDate()
      ? this.currencyService.historical(from, to, amount, this.formatDate(this.selectedDate()!))
      : this.currencyService.convert(from, to, amount);

    obs.subscribe({
      next: (res) => {
        this.result.set(res.result);
        this.rate.set(res.rate);
        this.loading.set(false);
        this.historyService.add({
          from,
          to,
          amount,
          result: res.result,
          rate: res.rate,
          date: res.date || new Date().toISOString().split('T')[0],
          isHistorical: this.historicalMode(),
        });
      },
      error: () => {
        this.loading.set(false);
        this.snackBar.open('Conversion failed. Please try again.', 'Dismiss', { duration: 4000 });
      },
    });
  }

  private formatDate(d: Date): string {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
