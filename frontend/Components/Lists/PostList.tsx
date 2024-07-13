import React from 'react'
import PostCard from '../Cards/PostCard';
import { ImFileEmpty } from "react-icons/im";
import NoPosts from '../Cards/NoPosts';


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
    cards: cardType[]
}

const PostList = ({cards}:Props) => {
  return (
    <div>
      {
        cards?.length ?
            cards.map(card=>(
                <PostCard key={card.id} card={card} />
            ))
        :
        <NoPosts />
      }
    </div>
  )
}

export default PostList
