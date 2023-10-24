import { FastifyInstance } from 'fastify';

export type Account = {
  id: string;
  emailAddress: string;
  password: string;
};

export async function startServer(server: FastifyInstance) {
  try {
    await server.listen({ port: 3000 });
  } catch (e) {
    server.log.error(e);
    process.exit(1);
  }
}
