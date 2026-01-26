import { HeeyAli } from "@/heey-ali";
import { DropshippersApi } from "@/internal/apis/dropshipper/dropshipper";
import { heeyAliGetCredentialMock } from "test/integration/mocks/heey-ali-get-credential.mock";
import { beforeAll, describe, expect, it } from "vitest";

describe('DsAuthenticationTokenCreate', () => {
  let dropshippersApi: DropshippersApi;

  beforeAll(() => {
    const credentials = heeyAliGetCredentialMock()
    dropshippersApi = new HeeyAli(credentials).dropshippers;
  });

  it('should not create a token with invalid code', async () => {
    const result = await dropshippersApi.authentication.tokenCreate({ code: 'invalid-code' });
   
    expect(result).toBeDefined();
    expect(result.success).toBeFalsy();
    expect(result.data).toBeInstanceOf(Object);
  });
  
  
  it('should create a token with valid code', async () => {
    const result = await dropshippersApi.authentication.tokenCreate({ 
      code: process.env.TEST_ALI_EXPRESS_CODE as string
    });
   
    expect(result).toBeDefined();
    expect(result.success).toBeTruthy();
    expect(result.data).toBeInstanceOf(Object);
  });
});