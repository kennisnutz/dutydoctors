'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import HydrationFix from '@/components/HydrationFix';

function DoctorPage() {
  const router = useRouter();

  const logOut = async () => {
    try {
      await axios.get('/api/users/logout');
      router.push('/login');
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <HydrationFix>
      <div>Doctor Dashboard</div>
      <button
        onClick={logOut}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
      >
        Logout
      </button>
    </HydrationFix>
  );
}

export default DoctorPage;
