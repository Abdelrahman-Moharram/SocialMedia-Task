import React from 'react'
import { ImFileEmpty } from 'react-icons/im'

const NoPosts = () => {
  return (
    <div className='mt-20 text-center'>
        <h1 className='font-extrabold text-3xl flex justify-center items-center gap-3 mb-4'>
        <ImFileEmpty />
        No Posts Available
        </h1>
        <span>You need to follow more people to see more content</span>
    </div>
  )
}

export default NoPosts
