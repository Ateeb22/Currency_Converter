import { IsString, IsNumber, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class ConvertDto {
  @IsString()
  from: string;

  @IsString()
  to: string;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @Min(0.01)
  amount: number;
}

export class HistoricalDto extends ConvertDto {
  @IsString()
  date: string;
}
