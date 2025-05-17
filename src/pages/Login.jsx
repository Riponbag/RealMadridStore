import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  
  const getValidationSchema = (mode) =>
    Yup.object().shape({
      ...(mode === 'Sign Up' && {
        name: Yup.string().required('Name is required'),
      }),
      email: Yup.string()
        .required('Email is required')
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Enter a valid email address'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    });

  
  const validationSchema = useMemo(() => getValidationSchema(currentState), [currentState]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  
  const onSubmitHandler = async (data) => {
    try {
      const url = currentState === 'Sign Up' ? '/api/user/register' : '/api/user/login';

      const payload =
        currentState === 'Sign Up'
          ? { name: data.name, email: data.email, password: data.password }
          : { email: data.email, password: data.password };

      const response = await axios.post(backendUrl + url, payload);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        reset();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const { email, name, sub: googleId } = decoded;

      const response = await axios.post(backendUrl + '/api/user/google-login', { email, name, googleId });

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
      } else {
        toast.error(response.data.message || 'Google login failed');
      }
    } catch (error) {
      console.log(error);
      toast.error('Google login error');
    }
  };

  const handleGoogleFailure = () => {
    toast.error('Google sign in failed. Try again later.');
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === 'Sign Up' && (
        <>
          <input
            type="text"
            placeholder="Name"
            {...register('name')}
            className="w-full px-3 py-2 border border-gray-800"
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
        </>
      )}

      <input
        type="email"
        placeholder="Email"
        {...register('email')}
        className="w-full px-3 py-2 border border-gray-800"
      />
      {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}

      <input
        type="password"
        placeholder="Password"
        {...register('password')}
        className="w-full px-3 py-2 border border-gray-800"
      />
      {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot Your Password?</p>
        {currentState === 'Login' ? (
          <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer">
            Create account
          </p>
        ) : (
          <p onClick={() => setCurrentState('Login')} className="cursor-pointer">
            Login Here
          </p>
        )}
      </div>

      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>

      <div className="mt-4">
        <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleFailure} useOneTap />
      </div>
    </form>
  );
};

export default Login;
