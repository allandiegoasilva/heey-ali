export function heeyAliGetCredentialMock() {
  if(!process.env.ALI_EXPRESS_APP_KEY || !process.env.ALI_EXPRESS_APP_SECRET || !process.env.ALI_EXPRESS_BASE_URL) {
    throw new Error('ALI_EXPRESS_APP_KEY, ALI_EXPRESS_APP_SECRET e ALI_EXPRESS_BASE_URL for heey ali integration tests are required.');
  }

  return {
    appKey: process.env.ALI_EXPRESS_APP_KEY,
    appSecret: process.env.ALI_EXPRESS_APP_SECRET,
    baseUrl: process.env.ALI_EXPRESS_BASE_URL,
  };
}