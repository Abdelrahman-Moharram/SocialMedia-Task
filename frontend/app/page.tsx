'use client'
import AuthenticatedOrRedirect from "@/Components/Guard/Page.Guard/AuthenticatedOrRedirect";
import PostList from "@/Components/Lists/PostList";
import { useGetPostsListQuery } from "@/redux/api/postsApiSlice";


export default function Home() {
  const {data} = useGetPostsListQuery({}, {refetchOnMountOrArgChange:true, refetchOnFocus:true})
  return (
    <AuthenticatedOrRedirect>
      <div className="grid grid-cols-4 pt-3">
        <div className=""></div>
        <div className="col-span-2">
          <PostList 
            cards={data?.posts}
          />
        </div>
        <div></div>
      </div>
    </AuthenticatedOrRedirect>
  );
}
