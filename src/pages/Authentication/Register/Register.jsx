import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import useAuth from '../../../hooks/useAuth';

const Register = () => {
    const {createUser} = useAuth();
    // console.log(createUser);
    
       const {register,handleSubmit,formState:{errors}} = useForm();
        const onSubmit = data =>{
          console.log(data.email,data.password);

            
          
              createUser(data.email,data.password)
              .then(result=>console.log(result.user)
              ).catch(error=>
                console.log(error.message)
                
              )
            
        }
    return (
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-3xl font-bold">Create an Account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
            {/* name */}
          <label className="label">Name</label>
          <input type="text" {...register("name",{required:true,minLength:5})} className="input" placeholder="Name" />
            {
                errors.name?.type ==="required" && <p className='text-red-600'>Name is required</p>
            }
            {
            errors.name?.type === "minLength" && <p className='text-red-600'>Name must be 5 character or longer</p>
            }
            {/* photoURL */}
          <label className="label">PhotoURL</label>
          <input type="text" {...register("photoURL",{required:true})} className="input" placeholder="PhotoURL" />
            {
                errors.photoURL?.type ==="required" && <p className='text-red-600'>PhotoURL is required</p>
            }
            {/* email */}
          <label className="label">Email</label>
          <input type="email" {...register("email",{required:true})} className="input" placeholder="Email" />
            {
                errors.email?.type ==="required" && <p className='text-red-600'>Email is required</p>
            }

          <label className="label">Password</label>
          <input type="password" {...register("password",{required:true,minLength:6})} className="input" placeholder="Password" />
          {
            errors.password?.type === "required" && <p className='text-red-600'>password is required</p>
          }
          {
            errors.password?.type === "minLength" && <p className='text-red-600'>password must be 6 character or longer</p>
          }
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-primary text-black text-lg mt-4">Register</button>
        </form>
         <p><small>Already have an account?<Link className="btn btn-link" to="/login">Login</Link></small></p>

         <SocialLogin></SocialLogin>
      </div>
    </div>
    );
};

export default Register;