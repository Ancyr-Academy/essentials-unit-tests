import prompt from 'prompt';
import {
  IPrinter,
  IPrompt,
  IRandomNumberGenerator,
  magicNumber,
} from './magic-number.ts';

prompt.start();

let printer: IPrinter = {
  print: console.log,
};

let randomNumberGenerator: IRandomNumberGenerator = {
  generate: () => Math.floor(Math.random() * 100) + 1,
};

let prompter: IPrompt = {
  askNumber: () =>
    prompt.get(['number']).then(({ number }) => parseInt(number as string, 10)),
};

magicNumber(printer, randomNumberGenerator, prompter);
