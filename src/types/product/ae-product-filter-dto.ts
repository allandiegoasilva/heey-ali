import { AECountryCode } from '@/enums/ae-country-code';
import { AECurrency } from '@/enums/ae-currency';
import { AELanguageCode } from '@/enums/ae-language-code';

export type AEProductFilterDto = {
  productId: number;
  targetCurrency: AECurrency;
  shipToCountry: AECountryCode;
  targetLanguage: AELanguageCode;
};
