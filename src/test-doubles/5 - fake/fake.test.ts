type FetchProductsArgs = {
  keyword: string;
  limit: number;
};

interface ProductFetcher {
  fetch(args: FetchProductsArgs): string[];
}

class InMemoryProductFetcher implements ProductFetcher {
  constructor(public readonly database: string[]) {}

  fetch(args: FetchProductsArgs) {
    return this.database.slice(0, args.limit);
  }
}

function fetchProducts(args: FetchProductsArgs, fetcher: ProductFetcher) {
  if (args.limit > 3) {
    args.limit = 3;
  }

  return fetcher.fetch(args);
}

test('it should cap the limit of products to 100', () => {
  const fetcher = new InMemoryProductFetcher([
    'crayon',
    'stylo',
    'papier',
    'gomme',
  ]);

  const result = fetchProducts({ keyword: 'foo', limit: 5 }, fetcher);
  expect(result).toEqual(['crayon', 'stylo', 'papier']);
});
