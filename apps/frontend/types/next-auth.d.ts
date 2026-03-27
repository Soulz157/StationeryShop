import { DefaultSession, DefaultUser } from 'next-auth'
import { JWT as DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    accessToken: string
    id: string
    role: string
  }
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      role: string
      accessToken: string
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    id: string
    role: string
    accessToken: string
  }
}
