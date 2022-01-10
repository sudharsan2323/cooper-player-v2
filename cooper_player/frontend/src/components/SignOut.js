import React, { useEffect } from 'react';
import { useHistory, useLocation, Redirect } from 'react-router-dom';

const SignOut = (props) => {
    const history = useHistory()
    const location = useLocation()
    useEffect(() => {
        if(!location.data){
            return (
                <Redirect to="/"/>
            )
        }
        localStorage.clear()
        location.data.authHandler()
        history.push("/")
    }, [])
    if(!location.data){
        return (
            <Redirect to="/"/>
        )
    }
    return <div></div>
    
}

export default SignOut
