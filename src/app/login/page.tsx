'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';

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
function LoginPage() {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', user);
      console.log('login Success ' + response.data);
      toast.success('Login success');
      router.push('/profile');
    } catch (error: any) {
      console.log('Could not log in user ' + error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex min-h-screen">
      <div className="flex w-[50%] min-h-screen  bg-gray-500">
        <h1>Image</h1>
      </div>
      <div className="flex w-[50%] min-h-screen flex-col items-center gap-5 justify-center">
        <h1 className="font-bold mb-6 mt-3">
          {loading ? 'Processing...' : 'Log In'}
        </h1>

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
          <label htmlFor="password">Password:</label>
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
          <button
            className="p-2 border border-gray-300 text-gray-600 bg-blue-200 min-w-[20%]
        rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            onClick={onLogin}
          >
            {' '}
            {buttonDisabled ? '...' : 'Log In'}
          </button>
          <Link href={'/signup'}>Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
