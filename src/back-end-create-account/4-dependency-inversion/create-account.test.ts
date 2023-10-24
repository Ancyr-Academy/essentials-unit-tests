import { Account } from '../shared.ts';
import { CreateAccountCommand } from './create-account.ts';
import { IDatabase, IUUIDGenerator } from './dependencies.ts';

class InMemoryDatabase implements IDatabase {
  constructor(public readonly accounts: Account[] = []) {}

  exists(emailAddress: string) {
    return this.accounts.some(
      (account) => account.emailAddress === emailAddress,
    );
  }

  insert(account: Account) {
    this.accounts.push(account);
  }
}

class FixedUUIDGenerator implements IUUIDGenerator {
  static Value = '00000000-0000-0000-0000-000000000000';

  generate() {
    return FixedUUIDGenerator.Value;
  }
}

describe('creating an account', () => {
  it('should return a success', () => {
    let database = new InMemoryDatabase();
    let uuidGenerator = new FixedUUIDGenerator();

    const command = new CreateAccountCommand(database, uuidGenerator);
    const result = command.execute({
      emailAddress: 'johndoe@gmail.com',
      password: 'azerty123',
    });

    expect(result).toEqual({
      type: 'success',
      account: {
        id: FixedUUIDGenerator.Value,
        emailAddress: 'johndoe@gmail.com',
        password: 'azerty123',
      },
    });
  });

  it('should save the account in database', () => {
    let database = new InMemoryDatabase();
    let uuidGenerator = new FixedUUIDGenerator();

    const command = new CreateAccountCommand(database, uuidGenerator);
    command.execute({
      emailAddress: 'johndoe@gmail.com',
      password: 'azerty123',
    });

    expect(database.accounts).toEqual([
      {
        id: FixedUUIDGenerator.Value,
        emailAddress: 'johndoe@gmail.com',
        password: 'azerty123',
      },
    ]);
  });
});

describe('passing incorrect data', () => {
  it('should throw', () => {
    let database = new InMemoryDatabase();
    let uuidGenerator = new FixedUUIDGenerator();

    const command = new CreateAccountCommand(database, uuidGenerator);
    expect(() =>
      command.execute({
        emailAddress: 'johndoe@gmail.com',
        password: 'azerty',
      }),
    ).toThrow();
  });
});

describe('creating an account with an existing e-mail address', () => {
  it('should return a success', () => {
    let database = new InMemoryDatabase([
      {
        id: 'some-id',
        emailAddress: 'johndoe@gmail.com',
        password: 'azerty123',
      },
    ]);

    let uuidGenerator = new FixedUUIDGenerator();

    const command = new CreateAccountCommand(database, uuidGenerator);
    const result = command.execute({
      emailAddress: 'johndoe@gmail.com',
      password: 'azerty123',
    });

    expect(result).toEqual({
      type: 'error',
      error: 'ACCOUNT_ALREADY_EXISTS',
      message: 'An account with this email address already exists',
    });
  });

  it('should not save the account twice in database', () => {
    let database = new InMemoryDatabase([
      {
        id: 'some-id',
        emailAddress: 'johndoe@gmail.com',
        password: 'azerty123',
      },
    ]);
    let uuidGenerator = new FixedUUIDGenerator();

    const command = new CreateAccountCommand(database, uuidGenerator);
    command.execute({
      emailAddress: 'johndoe@gmail.com',
      password: 'azerty123',
    });

    expect(database.accounts).toEqual([
      {
        id: 'some-id',
        emailAddress: 'johndoe@gmail.com',
        password: 'azerty123',
      },
    ]);
  });
});
