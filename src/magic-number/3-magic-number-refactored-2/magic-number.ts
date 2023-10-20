export interface IPrinter {
  print: (message: string) => void;
}

export interface IRandomNumberGenerator {
  generate: () => number;
}

export interface IPrompt {
  askNumber: () => Promise<number>;
}

export async function magicNumber(
  printer: IPrinter,
  randomNumberGenerator: IRandomNumberGenerator,
  prompt: IPrompt,
) {
  printer.print('Welcome to the magic number !');

  let magicNumber = randomNumberGenerator.generate();
  let userNumber = -1;

  while (userNumber !== magicNumber) {
    userNumber = await prompt.askNumber();

    if (userNumber > magicNumber) {
      printer.print('Trop grand !');
    } else if (userNumber < magicNumber) {
      printer.print('Trop petit !');
    } else {
      printer.print('Vous avez gagné !');
    }
  }
}
