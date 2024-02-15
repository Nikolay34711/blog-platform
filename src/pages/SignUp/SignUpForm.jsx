import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registration } from '../../services/services';
import './SignUpForm.scss';

export default function SignUpForm() {
  const nav = useNavigate();
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registration(user);
      setUser({ username: '', email: '', password: '' });
      nav('/sign-in');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='sign-up-form'>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username' className='username'>
          Username
          <input
            type='text'
            id='username'
            placeholder='some-username'
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </label>

        <label htmlFor='email' className='email'>
          Email address
          <input
            type='email'
            id='email'
            placeholder='Email address'
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </label>

        <label htmlFor='pass' className='pass'>
          Password
          <input
            type='password'
            id='pass'
            placeholder='Password'
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </label>

        <label htmlFor='repeat'>
          Repeat Password
          <input
            type='password'
            id='repeat'
            placeholder='Password'
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </label>

        <label htmlFor='check' className='check'>
          <input type='checkbox' id='check' placeholder='Password' />I agree to the processing of my
          personal information
        </label>

        <button>Create</button>

        <span>
          Already have an account ? <Link to='/sign-in'>Sign In.</Link>
        </span>
      </form>
    </div>
  );
}