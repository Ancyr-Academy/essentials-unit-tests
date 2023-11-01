import Fastify from 'fastify';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 } from 'uuid';
import z from 'zod';
import { Account, startServer } from '../shared.ts';

class FileSystemDatabase {
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

const fastify = Fastify({ logger: true });

const createAccountSchema = z.object({
  emailAddress: z.string().email(),
  password: z.string().min(8),
});

fastify.post('/account', async (request: any, reply) => {
  const data = createAccountSchema.parse(request.body);

  const database = new FileSystemDatabase();
  const accountAlreadyExists = database.exists(data.emailAddress);

  if (accountAlreadyExists) {
    return reply.code(400).send({
      error: 'ACCOUNT_ALREADY_EXISTS',
      message: 'An account with this email address already exists',
    });
  }

  const account = {
    id: v4(),
    emailAddress: data.emailAddress,
    password: data.password,
  };

  database.insert(account);
  reply.code(200).send(account);
});

startServer(fastify);
