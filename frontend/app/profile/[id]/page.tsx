'use client'
import React from 'react'
import BaseUserInfo from './_Components/BaseUserInfo'
import { HiHeart } from 'react-icons/hi'
import { useParams } from 'next/navigation'
import PostList from '@/Components/Lists/PostList'
import { useProfileQuery } from '@/redux/api/postsApiSlice'
import { IoHeartDislike } from "react-icons/io5";
import FollowButton from './_Components/FollowButton'

const page = () => {
  const {id}:{id:string} = useParams()
  const  {isLoading, error, data} = useProfileQuery(id)
  
  return (
  <div className="lg:w-[80%] min-h-screen w-full mx-auto bg-white rounded-lg my-3 overflow-hidden ">
    <div className="flex justify-between pt-16 px-16">
      {
        data?.user?
          <BaseUserInfo user={data?.user} />
        :null
      }
      
      <FollowButton is_follower={data?.is_follower} />
      
    </div>

    <div className="mx-auto w-3/4 p-4 bg-gray-200 rounded-md mt-32">
      <h2 className='text-2xl font-semibold my-12'>Posts</h2>

      <div className="shadow-lg rounded-md overflow-hidden bg-white">
        <PostList
          cards={data?.posts}
        />
      </div>
    </div>
  </div>
  )
}

export default page
