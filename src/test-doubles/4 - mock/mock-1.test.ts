type FetchProductsArgs = {
  keyword: string;
  limit: number;
};

interface ProductFetcher {
  fetch(args: FetchProductsArgs): string[];
}

class MockProductFetcher implements ProductFetcher {
  private expectedMaxProducts: number;

  setExpectedMaxProducts(expectedMaxProducts: number) {
    this.expectedMaxProducts = expectedMaxProducts;
  }

  fetch(args: FetchProductsArgs) {
    if (args.limit > this.expectedMaxProducts) {
      throw new Error('Mock Error : max products exceeded');
    }

    // Ou expect(args.limit).toBeLessThanOrEqual(this.expectedMaxProducts)
    return [];
  }
}

function fetchProducts(args: FetchProductsArgs, fetcher: ProductFetcher) {
  if (args.limit > 100) {
    args.limit = 100;
  }

  return fetcher.fetch(args);
}

test('it should cap the limit of products to 100', () => {
  const fetcher = new MockProductFetcher();
  fetcher.setExpectedMaxProducts(100);

  const result = fetchProducts({ keyword: 'foo', limit: 200 }, fetcher);
  expect(result).toEqual([]);
});
