import React, { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditProfile.scss';

export default function EditProfile() {
  const { jwt } = useSelector((state) => state.user);
  const nav = useNavigate();

  useEffect(() => {
    if (!jwt) {
      nav('/sign-in');
    }
  }, [jwt, nav]);

  const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup
      .string()
      .email('Email is invalid')
      .required('Email is required')
      .lowercase('Email must be lowercase'),
    password: yup.string().min(6, 'Password must be at least 6 characters'),
    avatarImage: yup.string().url('Avatar image URL is invalid'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(
        'https://blog.kata.academy/api/user',
        { user: { ...data } },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${jwt}`,
          },
        },
      );
      console.log('Profile Updated:', response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className='edit-profile'>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Username
          {errors.username && <span className='error'>{errors.username.message}</span>}
          <input type='text' placeholder='Username' {...register('username')} />
        </label>
        <label className='email'>
          Email address
          {errors.email && <span className='error'>{errors.email.message}</span>}
          <input type='email' placeholder='Email address' {...register('email')} />
        </label>
        <label>
          New password
          {errors.password && <span className='error'>{errors.password.message}</span>}
          <input type='password' placeholder='New password' {...register('password')} />
        </label>

        <label>
          Avatar image (URL)
          {errors.avatarImage && <span className='error'>{errors.avatarImage.message}</span>}
          <input type='url' placeholder='Avatar image URL' {...register('avatarImage')} />
        </label>
        <button type='submit'>Save</button>
      </form>
    </div>
  );
}
