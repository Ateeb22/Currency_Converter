import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

const BASE_URL = 'https://api.freecurrencyapi.com/v1';

@Injectable()
export class CurrencyService {
  private apiKey: string;

  constructor(private config: ConfigService) {
    this.apiKey = this.config.get<string>('CURRENCY_API_KEY')!;
  }

  async getCurrencies() {
    try {
      const { data } = await axios.get(`${BASE_URL}/currencies`, {
        params: { apikey: this.apiKey },
      });
      return data.data;
    } catch (err) {
      this.handleError(err);
    }
  }

  async convert(from: string, to: string, amount: number) {
    try {
      const { data } = await axios.get(`${BASE_URL}/latest`, {
        params: {
          apikey: this.apiKey,
          base_currency: from,
          currencies: to,
        },
      });
      const rate = data.data[to];
      return {
        from,
        to,
        rate,
        amount,
        result: +(amount * rate).toFixed(4),
      };
    } catch (err) {
      this.handleError(err);
    }
  }

  async historical(from: string, to: string, amount: number, date: string) {
    try {
      const { data } = await axios.get(`${BASE_URL}/historical`, {
        params: {
          apikey: this.apiKey,
          base_currency: from,
          currencies: to,
          date,
        },
      });
      const dateKey = Object.keys(data.data)[0];
      const rate = data.data[dateKey][to];
      return {
        from,
        to,
        rate,
        amount,
        result: +(amount * rate).toFixed(4),
        date: dateKey,
      };
    } catch (err) {
      this.handleError(err);
    }
  }

  private handleError(err: any) {
    if (err.response) {
      throw new HttpException(
        err.response.data?.message || 'API request failed',
        err.response.status,
      );
    }
    throw new HttpException('Service unavailable', HttpStatus.SERVICE_UNAVAILABLE);
  }
}
