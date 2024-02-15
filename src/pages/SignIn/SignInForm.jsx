import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { setAuth } from '../../Redux/slice/sliceAuthentication';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../../services/services';
import './SignInForm.scss';

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async (data) => {
    try {
      setSubmitting(true);
      const res = await login(data);
      dispatch(setAuth(res.data.user));
      nav('/');
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='sign-in-form'>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit(handleLogin)}>
        <label htmlFor='email' className='email'>
          Email address
          {errors.email && <span className='error'>{errors.email.message}</span>}
          <input
            type='email'
            id='email'
            placeholder='Email address'
            {...register('email', { required: 'Email is required' })}
          />
        </label>
        <label htmlFor='pass' className='pass'>
          Password
          {errors.password && <span className='error'>{errors.password.message}</span>}
          <input
            type='password'
            id='pass'
            placeholder='Password'
            {...register('password', { required: 'Password is required' })}
          />
        </label>
        <button type='submit' disabled={submitting}>
          Login
        </button>
        <span>
          Dont't have an account? <Link to='/sign-up'>Sign Up.</Link>
        </span>
      </form>
    </div>
  );
}
