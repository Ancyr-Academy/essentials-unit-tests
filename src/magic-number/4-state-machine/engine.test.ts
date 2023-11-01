import { Engine, Result } from './engine.ts';

describe('passing the correct number', () => {
  it('should return win', () => {
    let engine = new Engine(50);
    let result = engine.check(50);

    expect(result).toEqual(Result.Win);
  });
  it('should change the state to finished', () => {
    let engine = new Engine(50);
    engine.check(50);

    expect(engine.isFinished()).toEqual(true);
  });
});

describe('passing a number that is too big', () => {
  it('should return win', () => {
    let engine = new Engine(50);
    let result = engine.check(55);

    expect(result).toEqual(Result.TooBig);
  });
  it('should change the state to finished', () => {
    let engine = new Engine(50);
    engine.check(55);

    expect(engine.isFinished()).toEqual(false);
  });
});

describe('passing a number that is too small', () => {
  it('should return win', () => {
    let engine = new Engine(50);
    let result = engine.check(45);

    expect(result).toEqual(Result.TooSmall);
  });
  it('should change the state to finished', () => {
    let engine = new Engine(50);
    engine.check(45);

    expect(engine.isFinished()).toEqual(false);
  });
});

describe('playing when the game is finished', () => {
  it('should throw an error', () => {
    let engine = new Engine(50);
    engine.check(50);

    expect(() => engine.check(50)).toThrowError('Game is finished');
  });
});
