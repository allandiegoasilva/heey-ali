import { HeeyAli } from "@/heey-ali";
import { beforeAll, describe, expect, it } from "vitest";


describe('HeeyAli', () => {
  let sut: HeeyAli;

  beforeAll(() => {
    sut = new HeeyAli({
      appKey: '123',
      appSecret: '123',
      baseUrl: 'https://api.ali.com',
    });
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});