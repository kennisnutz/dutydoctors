import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export interface SessionProps {
  id: string;
  role: string;
  email: string;
  fullName: string;
}

export const getSessionData = (request: NextRequest) => {
  try {
    const sessionToken = request.cookies.get('token')?.value || '';
    const tokenData = jwt.verify(
      sessionToken,
      process.env.JWT_SECRET_KEY!
    ) as SessionProps;
    return {
      id: tokenData.id,
      role: tokenData.role,
      email: tokenData.email,
      fullName: tokenData.fullName,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
