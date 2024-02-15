import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { setAuth } from '../../Redux/slice/sliceAuthentication';
import { useDispatch } from 'react-redux';
import { login } from '../../services/services';
import './SignInForm.scss';

export default function SignInForm() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(user);
      dispatch(setAuth(res.data.user));
      nav('/');
    } catch (error) {
      console.error(error);
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
          Dont't have an account? <Link to='/sign-up'>Sign Up.</Link>
        </span>
      </form>
    </div>
  );
}
