import { FastifyRequest, FastifyReply } from "fastify";

export type AuthenticatedRequest = FastifyRequest & {
  users: UserPayload.Request;
};
