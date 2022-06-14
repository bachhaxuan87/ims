import { Expose } from 'class-transformer';
import {
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

import { Transform } from 'class-transformer';

export function Default(defaultValue: any) {
  return Transform((data: any) => (data.value != undefined ? data.value : defaultValue));
}


export default class SearchProductDto {
  @IsString()
  @IsOptional()
  public search: string;

  @Expose()
  @Default('1')
  @IsOptional()
  @IsNumberString()
  public page: number;

  @Expose()
  @Default('20')
  @IsOptional()
  @IsNumberString()
  public limit: number;
}