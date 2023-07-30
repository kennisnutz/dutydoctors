import User from '@/models/userModels';
import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongoose';

interface userProps {
  _id: ObjectId;
  email: string;
  fullName: string;
  password: string;
  role: string;
}

connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    //check if user exists
    const user = await User.findOne({ email: email }).exec();

    if (!user) {
      return NextResponse.json(
        { error: 'User does not exist!' },
        { status: 403 }
      );
    }

    //validate password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { error: 'Password does not match!' },
        { status: 402 }
      );
    }
    //create session token
    const tokenData = {
      fullName: user.fullName,
      id: user._id,
      email: user.email,
      role: user.role,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, {
      expiresIn: '4h',
    });
    const response = NextResponse.json({
      message: 'Login successful',
      success: true,
    });
    response.cookies.set('token', token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
