import { Pipe, PipeTransform } from '@angular/core';
import { HEALTH_CATEGORY_ENUM_TO_LITERAL_MAP, NE107HealthCategoryEnum } from 'src/app/core';

@Pipe({
  name: 'appStateLiteral',
})
export class AppStateLiteralPipe implements PipeTransform {
  transform(value: string): string {
    return HEALTH_CATEGORY_ENUM_TO_LITERAL_MAP.get(Number(value)) || HEALTH_CATEGORY_ENUM_TO_LITERAL_MAP.get(NE107HealthCategoryEnum.UNDEFINED)!;
  }
}
