type FetchProductsArgs = {
  keyword: string;
  limit: number;
};

interface ProductFetcher {
  fetch(args: FetchProductsArgs): string[];
}

class MockProductFetcher implements ProductFetcher {
  private fetchCallback: ProductFetcher['fetch'] = () => [];

  setCallback(callback: ProductFetcher['fetch']) {
    this.fetchCallback = callback;
  }

  fetch(args: FetchProductsArgs) {
    return this.fetchCallback(args);
  }
}

function fetchProducts(args: FetchProductsArgs, fetcher: ProductFetcher) {
  if (args.limit > 100) {
    args.limit = 100;
  }

  return fetcher.fetch(args);
}

test('it should cap the limit of products to 100', () => {
  function sampleFetch() {
    return ['apple', 'banana'];
  }

  const fetcher = new MockProductFetcher();
  fetcher.setCallback((args) => {
    if (args.limit > 100) {
      throw new Error('Limit too high');
    }
    return ['apple', 'banana'];
  });

  const result = fetchProducts({ keyword: 'foo', limit: 200 }, fetcher);
  expect(result).toEqual(['apple', 'banana']);
});
