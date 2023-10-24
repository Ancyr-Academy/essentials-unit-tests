import z from 'zod';
import { IDatabase, IUUIDGenerator } from './dependencies.ts';

const createAccountSchema = z.object({
  emailAddress: z.string().email(),
  password: z.string().min(8),
});

export class CreateAccountCommand {
  constructor(
    private readonly database: IDatabase,
    private readonly uuidGenerator: IUUIDGenerator,
  ) {}

  execute(body) {
    const data = createAccountSchema.parse(body);
    const accountAlreadyExists = this.database.exists(data.emailAddress);

    if (accountAlreadyExists) {
      return {
        type: 'error',
        error: 'ACCOUNT_ALREADY_EXISTS',
        message: 'An account with this email address already exists',
      };
    }

    const account = {
      id: this.uuidGenerator.generate(),
      emailAddress: data.emailAddress,
      password: data.password,
    };

    this.database.insert(account);

    return {
      type: 'success',
      account: account,
    };
  }
}
