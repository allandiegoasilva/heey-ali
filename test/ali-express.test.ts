import { ProductEndpoint } from '@/enums/product-endpoint';
import { HttpMethod } from '@/internal/enum/http-method';
import { writeFileSync } from 'fs';
import { cwd } from 'process';
import { beforeAll, describe, expect, it, vi } from 'vitest';

describe('AliExpress', () => {
  let sut: AliExpress;

  beforeAll(() => {
    sut = new AliExpress();
  });

  it('should order params', () => {
    const result = sut.sortParams({
      a: '1',
      b: '2',
    });

    expect(result).toEqual({
      a: '1',
      b: '2',
    });
  });

  it('should buildParams', () => {
    const date = new Date(2000, 1, 1, 19);
    vi.setSystemTime(date);

    const result = sut.buildParams({
      a: '1',
      b: '2',
    });

    const includeAlgSign = result.includes('sign_method=sha256');
    const includeTimestampSign = result.includes('timestamp');
    const includeAppKey = result.includes('app_key');
    expect(includeAlgSign).toBeTruthy();
    expect(includeTimestampSign).toBeTruthy();
    expect(includeAppKey).toBeTruthy();
  });

  it('should create signature for request', async () => {
    const params = sut.sortParams({
      a: '1',
      b: '2',
    });

    const result = await sut.signParams(params);
    expect(result).toBeDefined();
  });

  it('should make a request for ali express and got a product', async () => {
    const product: any = await sut.request({
      endpoint: ProductEndpoint.GET,
      method: HttpMethod.POST,
      params: {
        ship_to_country: 'BR',
        product_id: '1005005033045832',
      },
    });

    const responseContent: any =
      product.data['aliexpress_ds_product_get_response'];

    expect(product.success).toBeTruthy();
    expect(responseContent.rsp_code).toBe(200);
    writeFileSync(cwd() + '/data.json', JSON.stringify(responseContent), {
      encoding: 'utf-8',
      flag: 'w+',
    });
  });
});
