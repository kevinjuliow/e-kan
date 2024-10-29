import { AuthOptions } from '../../../libs/auth/auth';
import NextAuth from 'next-auth';

const handler = NextAuth(AuthOptions);

export { handler as GET, handler as POST } // NextAuth recognized GET and POST method