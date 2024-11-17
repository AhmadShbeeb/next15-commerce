import 'next-auth';
import { User as PrismaUser } from '@prisma/client';

declare module 'next-auth' {
  interface User extends PrismaUser {}

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
