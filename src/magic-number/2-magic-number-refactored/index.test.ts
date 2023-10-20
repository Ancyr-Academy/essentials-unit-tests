import { IDependencies, magicNumber } from './magic-number.ts';

test('it should win if the number is correct', async () => {
  class Dependencies implements IDependencies {
    public prints: string[] = [];

    print(message: string) {
      this.prints.push(message);
    }

    randomNumber() {
      return 50;
    }

    askUserNumber() {
      return Promise.resolve(50);
    }
  }

  const dependencies = new Dependencies();
  await magicNumber(dependencies);

  expect(dependencies.prints).toEqual([
    'Welcome to the magic number !',
    'Vous avez gagné !',
  ]);
});

test('it should tell when the number is too small', async () => {
  class Dependencies implements IDependencies {
    public prints: string[] = [];
    public attempts = [49, 50];
    public attemptsIndex = 0;

    print(message: string) {
      this.prints.push(message);
    }

    randomNumber() {
      return 50;
    }

    askUserNumber() {
      return Promise.resolve(this.attempts[this.attemptsIndex++]);
    }
  }

  const dependencies = new Dependencies();
  await magicNumber(dependencies);

  expect(dependencies.prints).toEqual([
    'Welcome to the magic number !',
    'Trop petit !',
    'Vous avez gagné !',
  ]);
});

test('it should tell when the number is too big', async () => {
  class Dependencies implements IDependencies {
    public prints: string[] = [];
    public attempts = [51, 50];
    public attemptsIndex = 0;

    print(message: string) {
      this.prints.push(message);
    }

    randomNumber() {
      return 50;
    }

    askUserNumber() {
      return Promise.resolve(this.attempts[this.attemptsIndex++]);
    }
  }

  const dependencies = new Dependencies();
  await magicNumber(dependencies);

  expect(dependencies.prints).toEqual([
    'Welcome to the magic number !',
    'Trop grand !',
    'Vous avez gagné !',
  ]);
});
