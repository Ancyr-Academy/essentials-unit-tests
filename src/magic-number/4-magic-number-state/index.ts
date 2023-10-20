import prompt from 'prompt';
import { Engine, Result } from './engine.ts';

async function magicNumber() {
  prompt.start();

  console.log('Bienvenue dans le jeu du nombre magique !');

  const magicNumber = Math.floor(Math.random() * 100) + 1;
  let userNumber: number = -1;

  const engine = new Engine(magicNumber);

  while (engine.isNotFinished()) {
    const { number } = await prompt.get(['number ']);
    userNumber = parseInt(number as string, 10);

    switch (engine.check(userNumber)) {
      case Result.TooBig: {
        console.log('Trop grand !');
        break;
      }
      case Result.TooSmall: {
        console.log('Trop petit !');
        break;
      }
      case Result.Win: {
        console.log('Vous avez gagné !');
        break;
      }
    }
  }
}

magicNumber();
