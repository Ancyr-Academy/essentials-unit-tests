interface Discount {
  ratio(): number;
}

class StubDiscount implements Discount {
  constructor(private readonly _ratio: number) {}
  ratio() {
    return this._ratio;
  }
}

function calculatePrice(price: number, quantity: number, discount: Discount) {
  let total = price * quantity;

  // Apply a discount only if the total exceeds 50 euros
  if (total >= 50) {
    total *= discount.ratio();
  }

  return total;
}

test('calculating the price using a half discount', () => {
  expect(calculatePrice(5, 10, new StubDiscount(0.5))).toBe(25);
});
