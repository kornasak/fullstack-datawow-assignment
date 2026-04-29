import { Request } from 'express';

export type RequestUser = {
  id: number;
  fullName: string;
  email: string;
  role: 'ADMIN' | 'USER';
};

export type RequestWithUser = Request & {
  user: RequestUser;
};
