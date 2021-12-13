import React from 'react'
import { useSelector } from 'react-redux'
import {Navigate} from 'react-router-dom'


const RequireAuth = ({children,redirectTo}) => {
    const {isAuthenticated,loading} = useSelector(state => state.auth)
    return (
        !isAuthenticated && !loading ? <Navigate to={redirectTo}/> : children
    )
}

export default RequireAuth
