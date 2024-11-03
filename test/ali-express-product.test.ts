import { AliExpressProduct } from '@/models/ali-express-product';
import { beforeAll, describe, expect, it } from 'vitest';

describe('AliExpressProduct', () => {
  let sut: AliExpressProduct;
  beforeAll(() => {
    sut = new AliExpressProduct();
  });

  it('should create an instance', () => {
    expect(sut).toBeInstanceOf(AliExpressProduct);
  });
});
