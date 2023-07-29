import React from 'react';

function MyProfile({ params }: any) {
  return (
    <div className="flex flex-col justify-center h-screen items-center">
      <h1>My profile </h1>
      <hr />
      <p className="tetx-4xl ">
        profile id:{' '}
        <span className="p-2 rounded-lg bg-orange-400 text-gray-100">
          {params.id}
        </span>
      </p>
    </div>
  );
}

export default MyProfile;
