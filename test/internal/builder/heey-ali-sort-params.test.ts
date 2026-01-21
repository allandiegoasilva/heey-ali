import { HeeyAliSortParams } from '@/internal/http/builder/heey-ali-sort-params';
import { describe, expect, it } from 'vitest';

describe('HeeyAliSortParams', () => {
  it('should sort params by key alphabetically', () => {
    const params = {
      zebra: 'value1',
      alpha: 'value2',
      beta: 'value3',
    };

    const result = HeeyAliSortParams.sortParams(params);

    const keys = Object.keys(result);
    expect(keys).toEqual(['alpha', 'beta', 'zebra']);
  });

  it('should preserve values when sorting', () => {
    const params = {
      z: 'value-z',
      a: 'value-a',
      m: 'value-m',
    };

    const result = HeeyAliSortParams.sortParams(params);

    expect(result.a).toBe('value-a');
    expect(result.m).toBe('value-m');
    expect(result.z).toBe('value-z');
  });

  it('should handle single param', () => {
    const params = {
      single: 'value',
    };

    const result = HeeyAliSortParams.sortParams(params);

    expect(result).toEqual({ single: 'value' });
  });

  it('should handle empty params object', () => {
    const params = {};

    const result = HeeyAliSortParams.sortParams(params);

    expect(result).toEqual({});
    expect(Object.keys(result)).toHaveLength(0);
  });

  it('should handle params with numbers in keys', () => {
    const params = {
      param2: 'value2',
      param1: 'value1',
      param10: 'value10',
    };

    const result = HeeyAliSortParams.sortParams(params);

    const keys = Object.keys(result);
    expect(keys).toEqual(['param1', 'param10', 'param2']);
  });

  it('should handle params with special characters in keys', () => {
    const params = {
      'param_b': 'value-b',
      'param_a': 'value-a',
      'param_c': 'value-c',
    };

    const result = HeeyAliSortParams.sortParams(params);

    const keys = Object.keys(result);
    expect(keys).toEqual(['param_a', 'param_b', 'param_c']);
  });
});

