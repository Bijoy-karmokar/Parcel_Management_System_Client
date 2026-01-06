// import { useQuery } from "@tanstack/react-query";
// import useAuth from "./useAuth";
// import useAxiosSecure from "./useAxiosSecure";


// const useUserRole = () => {
//   const { user, loading } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const {
//     data: roleData,
//     isLoading,
//     refetch,
//   } = useQuery({
//     queryKey: ["userRole", user?.email],
//     enabled: !loading && !!user?.email,
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/users/role/${user.email}`);
//       return res.data;
//     },
//   });

//   return {
//     role: roleData?.role || "user",
//     roleLoading: isLoading || loading,
//     refetchRole: refetch,
//   };
// };

// export default useUserRole;

import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data;
    },
  });

  return {
    role: data?.role || "user",
    roleLoading: isLoading || loading,
    refetchRole: refetch,
  };
};

export default useUserRole;

