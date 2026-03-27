import { FastifyRequest, FastifyReply } from 'fastify'

export type AuthenticatedRequest = FastifyRequest & {
  users: Auth.UserPayload
}
