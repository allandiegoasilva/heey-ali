/**
 * Endpoint prefix enum for AliExpress Open Platform API endpoints.
 *
 * AliExpress Open Platform provides an online production environment. The data under
 * the production environment are all true online data, providing limited times and
 * authority of interface calling. The production environment shares data with the
 * online system, and the true data of an online shop are directly influenced by the
 * interface for writing class, so you must operate with caution.
 *
 * Currently, all interfaces are divided into two categories: System interfaces and
 * Business interfaces. And you need to choose the correct endpoint to use for each
 * type API.
 *
 * @see https://openservice.aliexpress.com/doc/doc.htm?spm=a2o9m.11193494.0.0.80ca6095yBvNgQ&nodeId=27493&docId=118729#/?docId=1388
 */
export enum EndpointPrefix {
  /**
   * REST endpoint prefix for System interfaces.
   *
   * System interfaces are Authorization relative APIs under 'System Tool' in the
   * API documentation.
   *
   * Format: https://api-sg.aliexpress.com/rest{api_path}?{query}
   */
  REST = 'rest',

  /**
   * SYNC endpoint prefix for Business interfaces.
   *
   * Business interfaces are all other APIs except system APIs.
   *
   * Format: https://api-sg.aliexpress.com/sync?method={api_path}&{query}
   */
  SYNC = 'sync',
}
