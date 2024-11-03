import { HttpMethod } from '@/enums/http-method';
import { ProductEndpoint } from '@/enums/product-endpoint';
import { AliExpress } from '@/models/ali-express';
import { AEProductFilterDto } from '@/types/product/ae-product-filter-dto';
import { ProductDto } from '@/types/product/product-dto';
import { ReplyDto } from '@/types/reply-dto';

export class AliExpressProduct extends AliExpress {
  async get(input: AEProductFilterDto): Promise<ReplyDto<ProductDto>> {
    const request = await this.request<ProductDto>({
      endpoint: ProductEndpoint.GET,
      method: HttpMethod.GET,
      params: {
        product_id: input.productId.toString(),
        ship_to_country: input.shipToCountry,
        target_currency: input.targetCurrency,
        target_language: input.targetLanguage,
      },
    });

    return {
      success: true,
      data: request.data,
    };
  }
}
