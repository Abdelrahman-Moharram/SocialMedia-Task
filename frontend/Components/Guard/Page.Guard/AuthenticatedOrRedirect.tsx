import React, { useEffect } from 'react'
import { useAppSelector } from '../../../redux/hooks';
import { useRouter } from 'next/navigation';

const AuthenticatedOrRedirect = ({children}:{children:React.ReactNode}) => {
	const { isAuthenticated } = useAppSelector(state => state.auth);
    const router = useRouter()
    console.log(isAuthenticated);
    
    useEffect(() => {
        if(!isAuthenticated)
            router.push("/auth/login")
      }, [isAuthenticated]);
    return(
        children 
    )
}


export default AuthenticatedOrRedirect