import Image from 'next/image'
import React from 'react'

interface userType{
    id: string;
    username: string;
    image: string;
    email: string
}

interface Props{
    user: userType
}

const BaseUserInfo = ({user}:Props) => {
    console.log(user);
    
  return (
    <div className='flex items-center gap-5'>
      <div className='border border-primary rounded-full overflow-hidden bg-gray-200'>
        <Image
            src={process.env.NEXT_PUBLIC_HOST + user?.image}
            width={100}
            height={100}
            alt='user profile image'
            className=''
        />
      </div>
      <div className=''>
        <p className='font-bold text-2xl'>{user?.username}</p>
        <span className='text-gray-600 text-sm '>{user?.email}</span>
      </div>
    </div>
  )
}

export default BaseUserInfo
