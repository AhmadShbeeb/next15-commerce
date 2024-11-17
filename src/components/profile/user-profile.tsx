'use client';

import { Session } from 'next-auth';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

interface UserProfileProps {
  user: Session['user'];
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <div className='bg-white shadow rounded-lg p-6'>
      <div className='flex flex-col items-center'>
        {user.image && (
          <div className='relative w-24 h-24 mb-4'>
            <Image src={user.image} alt={user.name || 'User'} fill className='rounded-full object-cover' />
          </div>
        )}
        <h2 className='text-xl font-semibold'>{user.name}</h2>
        <p className='text-gray-600 mt-1'>{user.email}</p>
      </div>

      <div className='mt-6 pt-6 border-t'>
        <button
          onClick={() => signOut()}
          className='w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors'
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
