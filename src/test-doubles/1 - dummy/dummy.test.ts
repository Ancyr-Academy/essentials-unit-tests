interface Discount {
  ratio(): number;
}

class DummyDiscount {
  ratio() {
    return 0;
  }
}

class HalfDiscount {
  ratio() {
    return 0.5;
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

test('calculating the price without applying a discount', () => {
  expect(calculatePrice(5, 1, new DummyDiscount())).toBe(5);
});

test('calculating the price using a half discount', () => {
  expect(calculatePrice(5, 10, new HalfDiscount())).toBe(25);
});
