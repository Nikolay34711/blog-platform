import { useState } from 'react';
import axios from 'axios';
import './SignInForm.scss';

export default function SignInForm() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://blog.kata.academy/api/users/login', { user });
      console.log(`Успех ${res.data}`);
    } catch (error) {
      console.log(`не успех ${error}`);
    }
  };

  return (
    <div className='sign-in-form'>
      <h2>Sign In</h2>
      <form>
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
        <button onClick={handleLogin}>Login</button>
        <span>
          Dont't have an account? <a href='#'>Sign Up.</a>
        </span>
      </form>
    </div>
  );
}
