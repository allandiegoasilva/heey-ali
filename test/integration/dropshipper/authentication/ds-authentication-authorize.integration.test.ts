import { HeeyAli } from "@/heey-ali";
import { DropshippersApi } from "@/internal/apis/dropshipper/dropshipper";
import { HeeyAliCredential } from "@/internal/types/heey-ali-credential.type";
import { heeyAliGetCredentialMock } from "test/integration/mocks/heey-ali-get-credential.mock";
import { beforeAll, describe, expect, it } from "vitest";

describe('DsAuthenticationAuthorize', () => {
  let dropshippersApi: DropshippersApi;
  let credentials: HeeyAliCredential & { redirectUri: string };
  beforeAll(() => {
    credentials = heeyAliGetCredentialMock() as HeeyAliCredential & { redirectUri: string };
    dropshippersApi = new HeeyAli(credentials).dropshippers;
  });

  it('should generate authorization URL with success', async () => {
    const redirectUri = credentials.redirectUri as string;
    const result = await dropshippersApi.authentication.authorize({ redirect_uri: redirectUri });
    
    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
    expect(result).toContain('force_auth=true');
    expect(result).toContain('response_type=code');
    expect(result).toContain(`redirect_uri=${encodeURIComponent(redirectUri)}`);
  });
});

