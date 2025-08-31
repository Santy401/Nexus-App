import React from 'react';
import Image from 'next/image';
import defaultUser from '@/app/ui/aseets/defaultUser.png';

const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    avatar: defaultUser.src
  },
  {
    id: 2,
    name: 'Jane Smith',
    username: 'janesmith',
    avatar: defaultUser.src
  },
  {
    id: 3,
    name: 'Alex Johnson',
    username: 'alexj',
    avatar: defaultUser.src
  }
];

export const Suggestions = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-primary mb-4">Sugerencias</h2>
      <div className="flex flex-col gap-4">
        {mockUsers.map((user) => (
          <div key={user.id} className="flex justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Image 
                src={user.avatar} 
                alt={user.name} 
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className='flex flex-col items-start'>
                <span className="font-bold">{user.name}</span>
                <span className="text-gray-500 text-sm">@{user.username}</span>
              </div>
            </div>
            <button 
              type="button" 
              className="bg-white text-black px-3 py-1 text-sm cursor-pointer rounded hover:bg-gray-100 transition-colors"
            >
              Seguir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
