import { Controller, Get, Query } from '@nestjs/common';
import { CurrencyService } from './currency.service.js';
import { ConvertDto, HistoricalDto } from './dto/convert.dto.js';

@Controller('currency')
export class CurrencyController {
  constructor(private currencyService: CurrencyService) {}

  @Get('list')
  getCurrencies() {
    return this.currencyService.getCurrencies();
  }

  @Get('convert')
  convert(@Query() query: ConvertDto) {
    return this.currencyService.convert(query.from, query.to, query.amount);
  }

  @Get('historical')
  historical(@Query() query: HistoricalDto) {
    return this.currencyService.historical(
      query.from,
      query.to,
      query.amount,
      query.date,
    );
  }
}
