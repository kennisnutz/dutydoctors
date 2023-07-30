'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import HydrationFix from '@/components/HydrationFix';

function Dashboard() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);

  const logOut = async () => {
    try {
      await axios.get('/api/users/logout');
      router.push('/login');
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getCurrentUser = async () => {
    const response = await axios.get('/api/users/current_user');
    setCurrentUser(response.data.session);
    const rolePath = response.data.session.role;
    router.push(`/dashboard/${rolePath}`);
  };
  useEffect(() => {
    getCurrentUser();
  });

  return (
    <HydrationFix>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Dashboard</h1>
        <hr />
        <div className="flex flex-col">
          <h2>{currentUser?.fullName}</h2>
          <h2>{currentUser?.role}</h2>
          <h2>{currentUser?.id}</h2>
        </div>
        <button
          onClick={logOut}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
        >
          Logout
        </button>
      </div>
    </HydrationFix>
  );
}

export default Dashboard;
