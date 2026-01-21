
/* @internal */
export class HeeyAliSortParams {
  static sortParams(params: Record<string, string>): Record<string, string> {
    const sortedParams: Record<string, string> = {};
    const sortedKeys = Object.keys(params).sort();

    for (const key of sortedKeys) {
      sortedParams[key] = params[key] as string;
    }

    return sortedParams;
  }
}