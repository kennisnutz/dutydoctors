import { getSessionData } from '@/helpers/getSessionData';
import User from '@/models/userModels';
import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';

connect();
export async function GET(request: NextRequest) {
  try {
    const session = getSessionData(request);
    const user = await User.findById(session.id).select('-password');
    return NextResponse.json({
      message: 'User found',
      success: true,
      user,
      session,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
