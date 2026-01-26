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
    console.log(result);
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Object);
    
    // Verifica se a resposta contém informações de erro
    // A API do AliExpress retorna error_response com code e msg quando há erro
    const errorResponse = result as { code?: string | number; msg?: string; [key: string]: unknown };
    expect(errorResponse.code).toBeDefined();
    expect(typeof errorResponse.code === 'string' || typeof errorResponse.code === 'number').toBe(true);
  });
});