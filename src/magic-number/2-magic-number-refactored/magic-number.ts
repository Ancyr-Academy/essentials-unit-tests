export interface IDependencies {
  print: (message: string) => void;
  randomNumber: () => number;
  askUserNumber: () => Promise<number>;
}

export async function magicNumber(dependencies: IDependencies) {
  dependencies.print('Welcome to the magic number !');

  let magicNumber = dependencies.randomNumber();
  let userNumber = -1;

  while (userNumber !== magicNumber) {
    userNumber = await dependencies.askUserNumber();

    if (userNumber > magicNumber) {
      dependencies.print('Trop grand !');
    } else if (userNumber < magicNumber) {
      dependencies.print('Trop petit !');
    } else {
      dependencies.print('Vous avez gagné !');
    }
  }
}
