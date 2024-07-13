import { apiSlice } from "../services/apiSlice";


const EmployeesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({


        getPostsList:builder.query({
            query:()=>({
                url:"posts/",
                method:'GET',
            }),
        }),
        Search:builder.query({
            query:({query, size}:{query:string, size:string})=>({
                url:"users/search",
                method:'GET',
                params: {query, size}
            }),
        }),

        Profile:builder.query({
            query:(id:string)=>{                
                return ({
                    url:`users/profile/${id}`,
                    method:'GET',
                })
            },
            providesTags:['profile']
        }),

        follow:builder.mutation({
            query:(id:string)=>{
                
                return ({
                    url:`users/profile/${id}/follow`,
                    method:'GET',
                })
            },
            invalidatesTags:['profile']
        }),
        unfollow:builder.mutation({
            query:(id:string)=>{                
                return ({
                    url:`users/profile/${id}/unfollow`,
                    method:'GET',
                })
            },
            invalidatesTags:['profile']
        }),

        getNotifications: builder.query({
            query:({size}:{size?:string|undefined})=>{                
                return ({
                    url:`posts/notifications/`,
                    method:'GET',
                    params:{size}
                })
            }
        }),
        readNotifications: builder.mutation({
            query:()=>{                
                return ({
                    url:`posts/notifications/read/`,
                    method:'GET',
                })
            }
        }),
    })
         
}) 

export const {
    useGetPostsListQuery,
    useSearchQuery,
    useProfileQuery,
    useFollowMutation,
    useUnfollowMutation,
    useGetNotificationsQuery,
    useReadNotificationsMutation
} = EmployeesApiSlice