import prompt from 'prompt';
import { magicNumber } from './magic-number.ts';

magicNumber({
  print: console.log,
  randomNumber: () => Math.floor(Math.random() * 100) + 1,
  askUserNumber: () =>
    prompt.get(['number']).then(({ number }) => parseInt(number as string, 10)),
});
