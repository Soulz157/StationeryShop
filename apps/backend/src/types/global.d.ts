declare global {
  namespace UserPayload {
    interface Request {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      role: string;
      accessToken?: string;
    }
  }
}

export {};
