type FetchProductsArgs = {
  keyword: string;
  limit: number;
};

interface ProductFetcher {
  fetch(args: FetchProductsArgs): string[];
}

class SpyProductFetcher implements ProductFetcher {
  public fetchArgs: FetchProductsArgs[] = [];

  fetch(args: FetchProductsArgs) {
    this.fetchArgs.push(args);
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
  const fetcher = new SpyProductFetcher();
  const result = fetchProducts({ keyword: 'foo', limit: 200 }, fetcher);

  expect(result).toEqual([]);
});

test('it should cap the limit of products to 100', () => {
  const fetcher = new SpyProductFetcher();
  fetchProducts({ keyword: 'foo', limit: 200 }, fetcher);

  expect(fetcher.fetchArgs).toHaveLength(1);
  expect(fetcher.fetchArgs[0]).toEqual({ keyword: 'foo', limit: 100 });
});
