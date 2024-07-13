import { useFollowMutation, useUnfollowMutation } from '@/redux/api/postsApiSlice'
import { useParams } from 'next/navigation'
import React from 'react'
import { HiHeart } from 'react-icons/hi'
import { IoHeartDislike } from 'react-icons/io5'

const FollowButton = ({is_follower}:{is_follower:Boolean}) => {
    const [follow] = useFollowMutation()
    const [unfollow] = useUnfollowMutation()
    const {id}:{id:string} = useParams()

    const handleFollow = () =>{
        follow(id)
    }
    const handleUnFollow = () =>{
        unfollow(id)
    }
  return (
    <div>
      {
        is_follower?
        <button 
          className='w-fit h-fit px-5 py-3 rounded-md shadow-md bg-primary text-white flex items-center gap-3'
          onClick={handleUnFollow}
        >
          <IoHeartDislike />
          Unfollow
        </button>
        :
        <button
          className='w-fit h-fit px-5 py-3 rounded-md shadow-md bg-primary text-white flex items-center gap-3'
          onClick={handleFollow}
        >
            <HiHeart />
            Follow
        </button>
      }
    </div>
  )
}

export default FollowButton
