import { HeeyAli } from "@/heey-ali";
import { DropshippersApi } from "@/internal/apis/dropshipper/dropshipper";
import { heeyAliGetCredentialMock } from "test/integration/mocks/heey-ali-get-credential.mock";
import { beforeAll, describe, expect, it } from "vitest";

// TODO: implement this test

describe.skip('DsAuthenticationTokenCreate', () => {
  let dropshippersApi: DropshippersApi;

  beforeAll(() => {
    const credentials = heeyAliGetCredentialMock()
    dropshippersApi = new HeeyAli(credentials).dropshippers;
  });

  it('should create a token with success', async () => {
    const result = await dropshippersApi.authentication.tokenCreate({ code: 'invalid-code' });
    expect(result).toBeDefined();
  });
});