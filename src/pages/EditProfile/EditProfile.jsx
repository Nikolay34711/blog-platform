import React, { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
    email: yup.string().email('Email is invalid').required('Email is required'),
    newPassword: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    avatarImage: yup.string().url('Avatar image URL is invalid'),
  });

  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  return (
    <div className='edit-profile'>
      <h2>Edit Profile</h2>
      <form>
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
          {errors.newPassword && <span className='error'>{errors.newPassword.message}</span>}
          <input type='password' placeholder='New password' {...register('newPassword')} />
        </label>
        <label>
          Avatar image ( URL )
          <input type='url' {...register('avatarImageUrl')} placeholder='Avatar image' />
          {errors.avatarImage && <span>{errors.avatarImage.message}</span>}
        </label>
        <button type='submit'>Save</button>
      </form>
    </div>
  );
}
