import { useSearchQuery } from '@/redux/api/postsApiSlice'
import Image from 'next/image';
import Link from 'next/link'
import React, { useState } from 'react'
import { BiSearch } from 'react-icons/bi'

interface userType{
    id:string;
    username: string;
    email: string;
    image: string
}
const Search = () => {
    const [searchQuery, setSearch] = useState('')
    const {isLoading, data} = useSearchQuery({query: searchQuery, size:'4'}, {skip: !searchQuery, refetchOnMountOrArgChange:true})
  return (
    <div className="">

        <div className="relative">
            <label htmlFor="Search" className="sr-only"> Search </label>

            <input
                type="text"
                id="Search"
                placeholder="Search for..."
                value={searchQuery}
                onChange={e=>setSearch(e.target.value)}
                className="w-full rounded-md border-gray-200 py-2.5 px-10 shadow-lg sm:text-sm outline-none"
            />

            <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                {
                    searchQuery?
                        <Link href={`/search?user=${searchQuery}`} className="text-gray-600 hover:text-gray-700">
                            <span className="sr-only">Search</span>
                            <BiSearch />
                        </Link>
                    :
                        <button type='button' className="text-gray-600 hover:text-gray-700">
                            <span className="sr-only">Search</span>
                            <BiSearch />
                        </button>
                }
            </span>
        </div>
        {
            searchQuery && data?.users?.length?
                <div className='absolute left-20 right-20 top-[70px] px-2 bg-white shadow-lg rounded-md w-[500px]'>
                    {
                        data?.users?.map((user:userType)=>(
                            <div className='px-4 py-2' key={user?.id}>
                                <Link 
                                    href={`/profile/${user?.id}`}  
                                    className="flex px-2 py-1 gap-3 items-center hover:bg-gray-100 rounded-lg"
                                    onClick={()=>{
                                        if(searchQuery)
                                            setSearch('')
                                    }}
                                >
                                    <div className="">
                                        <Image 
                                            src={process.env.NEXT_PUBLIC_HOST + user?.image} 
                                            alt={user?.username} 
                                            width={60}
                                            height={60}
                                            className='w-[50px] h-[50px] rounded-full' 
                                        />
                                    </div>
                                    <div className='truncate float-start text-left'>
                                        {user.username}
                                        <br />
                                        <span className='text-gray-600 text-sm'>{user.email}</span>
                                    </div>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            :null
        }
    </div>
  )
}

export default Search