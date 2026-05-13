import { Injectable, signal } from '@angular/core';
import { ConversionRecord } from '../models/currency.model';

const STORAGE_KEY = 'conversion_history';

@Injectable({ providedIn: 'root' })
export class HistoryService {
  records = signal<ConversionRecord[]>(this.load());

  private load(): ConversionRecord[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.records()));
  }

  add(record: Omit<ConversionRecord, 'id' | 'timestamp'>) {
    const entry: ConversionRecord = {
      ...record,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    };
    this.records.update(list => [entry, ...list]);
    this.save();
  }

  remove(id: string) {
    this.records.update(list => list.filter(r => r.id !== id));
    this.save();
  }

  clear() {
    this.records.set([]);
    this.save();
  }
}
