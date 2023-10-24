import { Account } from '../shared.ts';

export interface IDatabase {
  exists(emailAddress: string): boolean;
  insert(account: Account): void;
}

export interface IUUIDGenerator {
  generate(): string;
}
