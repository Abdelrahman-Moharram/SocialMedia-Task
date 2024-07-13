import React, { useEffect } from 'react'
import { useAppSelector } from '../../../redux/hooks';
import { useRouter } from 'next/navigation';

const NotAuthenticatedOrRedirect = ({children}:{children:React.ReactNode}) => {
	const { isAuthenticated, isLoading } = useAppSelector(state => state.auth);
    const router = useRouter()

    useEffect(() => {
        if(isAuthenticated){
            router.push("/")
        }
      }, [isAuthenticated]);

    return(
        !isLoading?
            children
        :null
    )
}

export default NotAuthenticatedOrRedirect
