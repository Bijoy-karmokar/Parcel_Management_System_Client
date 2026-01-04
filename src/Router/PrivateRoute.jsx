import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const {loading,user} = useAuth();
    const location = useLocation();
    // console.log(location.pathname);
    
    
    if(loading){
        return <span className="loading loading-bars loading-xl"></span>
    }
    if(!user){
        return <Navigate state={{from : location.pathname}} to="/login"></Navigate>
    }
    return children;
};

export default PrivateRoute;