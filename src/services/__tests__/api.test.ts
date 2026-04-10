import {fetchProductsApi, searchProductsApi} from '../api';

describe('API Service', () => {
  it('should export fetchProductsApi', () => {
    expect(typeof fetchProductsApi).toBe('function');
  });

  it('should export searchProductsApi', () => {
    expect(typeof searchProductsApi).toBe('function');
  });
});
