import prompt from 'prompt';

async function magicNumber() {
  prompt.start();
  console.log('Welcome to the magic number !');

  let magicNumber = Math.floor(Math.random() * 100) + 1;
  let userNumber = -1;

  while (userNumber !== magicNumber) {
    const { number } = await prompt.get(['number']);
    userNumber = parseInt(number as string, 10);

    if (userNumber > magicNumber) {
      console.log('Trop grand !');
    } else if (userNumber < magicNumber) {
      console.log('Trop petit !');
    } else {
      console.log('Vous avez gagné !');
    }
  }
}

magicNumber();
