declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        name: string;
        role: string;
      };
    }
  }
}

export interface IAPIKey {
  id: number;
  name: string;
  key: string;
}
