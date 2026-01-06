// import axios from 'axios';
// import React from 'react';
// import useAuth from './useAuth';

// const axiosSecure = axios.create({
//       baseURL:"http://localhost:5000"

// })
// const useAxiosSecure = () => {
//     const {user} = useAuth();
//     axios.interceptors.request.use(config=>{
//         config.headers.Authorization =`Bearer ${user.accessToken}`
//         return config;
//     }, error=>{
//           return Promise.reject(error);
//     })
//     return axiosSecure;
// };

// export default useAxiosSecure;

import axios from "axios";
import useAuth from "./useAuth";
import React from "react";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  const { user } = useAuth();

  React.useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        if (user?.accessToken) {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      // eject interceptor on unmount
      axiosSecure.interceptors.request.eject(requestInterceptor);
    };
  }, [user]);

  return axiosSecure;
};

export default useAxiosSecure;
