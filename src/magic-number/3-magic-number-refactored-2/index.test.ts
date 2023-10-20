import {
  IPrinter,
  IPrompt,
  IRandomNumberGenerator,
  magicNumber,
} from './magic-number.ts';

class InMemoryPrinter implements IPrinter {
  public prints: string[] = [];

  print(message: string) {
    this.prints.push(message);
  }
}

class FixedNumberGenerator implements IRandomNumberGenerator {
  constructor(private number: number) {}

  generate() {
    return this.number;
  }
}

class SingleAttemptPrompt implements IPrompt {
  constructor(private number: number) {}

  askNumber() {
    return Promise.resolve(this.number);
  }
}

class MultipleAttemptsNumberPrompt implements IPrompt {
  constructor(private attempts: number[]) {}

  askNumber() {
    return Promise.resolve(this.attempts.shift() as number);
  }
}

test('it should win if the number is correct', async () => {
  const printer = new InMemoryPrinter();
  const randomNumberGenerator = new FixedNumberGenerator(50);
  const prompt = new SingleAttemptPrompt(50);

  await magicNumber(printer, randomNumberGenerator, prompt);

  expect(printer.prints).toEqual([
    'Welcome to the magic number !',
    'Vous avez gagné !',
  ]);
});

test('it should tell when the number is too small', async () => {
  const printer = new InMemoryPrinter();
  const randomNumberGenerator = new FixedNumberGenerator(50);
  const prompt = new MultipleAttemptsNumberPrompt([49, 50]);

  await magicNumber(printer, randomNumberGenerator, prompt);

  expect(printer.prints).toEqual([
    'Welcome to the magic number !',
    'Trop petit !',
    'Vous avez gagné !',
  ]);
});

test('it should tell when the number is too big', async () => {
  const printer = new InMemoryPrinter();
  const randomNumberGenerator = new FixedNumberGenerator(50);
  const prompt = new MultipleAttemptsNumberPrompt([51, 50]);

  await magicNumber(printer, randomNumberGenerator, prompt);

  expect(printer.prints).toEqual([
    'Welcome to the magic number !',
    'Trop grand !',
    'Vous avez gagné !',
  ]);
});
