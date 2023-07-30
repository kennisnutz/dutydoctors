'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';
import HydrationFix from '@/components/HydrationFix';

const roles = [
  'administrator',
  'doctor',
  'nurse',
  'accountant',
  'receptionist',
  'pharmacist',
  'patient',
  'laboratorist',
];
function SignupPage() {
  const router = useRouter();

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    password: '',
    role: '',
  });

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/signup', user);
      toast.success('User registed successfully');

      router.push('/login');
    } catch (error: any) {
      toast.error(error.message);
      console.log('Sign up failed! ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.fullName.length > 0 &&
      user.password.length > 0 &&
      user.email.length > 0 &&
      user.role.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <HydrationFix>
      <div className="flex min-h-screen">
        <div className="flex w-[50%] min-h-screen  bg-gray-500">
          <h1>Image</h1>
        </div>
        <div className="flex w-[50%] min-h-screen flex-col items-center gap-5 justify-center">
          <h1 className="font-bold mb-6 mt-3">
            {loading ? 'Processing...' : 'Sign Up'}
          </h1>
          <div className="flex justify-between items-center gap-4 w-[70%]">
            <label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              id="fullName"
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className="border border-gray-200 
            rounded-lg focus:outline-none focus:border-gray-600 p-2"
            />
          </div>
          <div className="flex justify-between items-center gap-4 w-[70%]">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="border border-gray-200 
            rounded-lg focus:outline-none focus:border-gray-600 p-2"
            />
          </div>
          <div className="flex justify-between items-center gap-4 w-[70%]">
            <label htmlFor="password">Passwoard:</label>
            <input
              type="password"
              id="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="border border-gray-200 
            rounded-lg focus:outline-none focus:border-gray-600 p-2"
            />
          </div>
          <div className="flex justify-between items-center gap-4 w-[70%]">
            <label htmlFor="role">Role:</label>
            <select
              name="role"
              id="role"
              onChange={(e) => setUser({ ...user, role: e.target.value })}
              className="border border-gray-200 text-center
            rounded-lg focus:outline-none focus:border-gray-600 p-2 w-[50%]"
            >
              <option value="">Select Role</option>
              {roles.map((role, i) => (
                <option key={i} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-between items-center gap-4 w-[70%]">
            <button
              className="p-2 border border-gray-300 text-gray-600 bg-blue-200 min-w-[20%]
        rounded-lg mb-4 focus:outline-none focus:border-gray-600"
              onClick={onSignUp}
            >
              {' '}
              {buttonDisabled ? '...' : 'Sign Up Here'}
            </button>
            <Link href={'/login'}>Login</Link>
          </div>
        </div>
      </div>
    </HydrationFix>
  );
}

export default SignupPage;
