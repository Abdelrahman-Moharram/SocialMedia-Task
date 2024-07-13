import Link from 'next/link';
import React from 'react'

interface userType{
    id: string;
    username: string;
    image: string;
}

interface cardType{
    id: string;
    image?: string | null;
    description: string;
    published_at: Date
    author: userType
}
interface Props{
    card: cardType
}
const PostCard = ({card}:Props) => {
    const created_date = () => {
        const date = new Date(card.published_at)
        return date.toUTCString()
    }
    
  return (
    <>
    <div className='p-0 rounded-lg bg-white my-5'>
        {/* Title */}
        <div className="flex justify-between p-3">
            <div className='flex gap-3'>
                <div className='rounded-full overflow-hidden'>
                    <img 
                        src={process.env.NEXT_PUBLIC_HOST + card?.author?.image}
                        alt='test image'
                        width={50}
                        height={50}
                    />
                </div>
                <div className=''>
                    <Link href={`/profile/${card?.author?.id}`} className='text-lg font-bold hover:underline'>{card?.author?.username}</Link>
                    <br />
                    <span className='text-gray-600 text-xs'>{created_date()}</span>
                </div>
            </div>
            <div></div>
        </div>

        {/* Description */}
        <p className='text-md text-black font-semibold py-3 px-5'>
            {card.description}
        </p>

        {
            card.image?
                <img 
                    src={process.env.NEXT_PUBLIC_HOST + card.image}
                    width={400}
                    height={300}
                    className='w-full'
                    alt='test image'
                />
            : null
        }
        <div className='h-[50px]'>

        </div>
    </div>
    </>
  )
}

export default PostCard
