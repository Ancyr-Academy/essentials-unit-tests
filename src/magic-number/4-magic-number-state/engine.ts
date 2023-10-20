export enum State {
  Started = 'started',
  Finished = 'finished',
}

export enum Result {
  TooBig = 'too-big',
  TooSmall = 'too-small',
  Win = 'win',
}
export class Engine {
  private state: State = State.Started;

  constructor(private number: number) {}

  public check(number: number) {
    if (this.state === 'finished') {
      throw new Error('Game is finished');
    }

    if (number > this.number) {
      return Result.TooBig;
    } else if (number < this.number) {
      return Result.TooSmall;
    } else {
      this.state = State.Finished;
      return Result.Win;
    }
  }

  isNotFinished() {
    return this.state !== State.Finished;
  }
}
