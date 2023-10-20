class Basket {
  public items: string[] = [];

  public addItem(item: string): number {
    this.items.push(item);
    return this.items.length;
  }
}

it('should return the amount of elements in the basket (Direct Output)', () => {
  let basket = new Basket();
  const total = basket.addItem('Apple');
  expect(total).toEqual(1);
});

it('should add the item to the basket (Indirect Output)', () => {
  let basket = new Basket();
  basket.addItem('Apple');
  expect(basket.items).toEqual(['Apple']);
});
