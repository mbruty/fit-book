declare namespace Express {
  interface Request {
      cookies: {
        [key: string]: string | undefined;
      }

      userId: string;
      validAuth: boolean;
  }
}