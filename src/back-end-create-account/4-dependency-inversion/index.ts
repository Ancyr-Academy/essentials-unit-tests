import Fastify from 'fastify';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 } from 'uuid';
import { Account, startServer } from '../shared.ts';
import { CreateAccountCommand } from './create-account.ts';
import { IDatabase, IUUIDGenerator } from './dependencies.ts';

class FileSystemDatabase implements IDatabase {
  static PATH = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    'database.json',
  );

  private accounts: Account[] = [];

  constructor() {
    if (!fs.existsSync(FileSystemDatabase.PATH)) {
      fs.writeFileSync(FileSystemDatabase.PATH, '[]');
      return;
    }

    const content = fs.readFileSync(FileSystemDatabase.PATH, 'utf-8');
    this.accounts = JSON.parse(content);
  }

  exists(emailAddress: string) {
    return this.accounts.some(
      (account) => account.emailAddress === emailAddress,
    );
  }

  insert(account: Account) {
    this.accounts.push(account);
    fs.writeFileSync(FileSystemDatabase.PATH, JSON.stringify(this.accounts));
  }
}

class V4UUIDGenerator implements IUUIDGenerator {
  generate() {
    return v4();
  }
}

const fastify = Fastify({ logger: true });

fastify.post('/account', async (request: any, reply) => {
  const command = new CreateAccountCommand(
    new FileSystemDatabase(),
    new V4UUIDGenerator(),
  );

  const result = await command.execute(request.body);

  if (result.type === 'error') {
    return reply.code(400).send({
      error: result.error,
      message: result.message,
    });
  } else {
    reply.code(200).send(result.account);
  }
});

startServer(fastify);
