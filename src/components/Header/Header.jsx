import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logo from './Rectangle 1.svg';
import { setAuth } from '../../Redux/slice/sliceAuthentication';
import './Header.scss';

export default function Header() {
  const { jwt, username } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    dispatch(setAuth({ token: '', username: '' }));
    nav('/sign-in');
  };

  return (
    <>
      <header className='header'>
        {jwt ? (
          <>
            <h2>
              <Link to='/'>RealWorld Blog</Link>
            </h2>
            <button className='btn-create'>
              <Link to='/new-article'>create article</Link>
            </button>
            <Link to='/profile'>
              <span className='name'>{username}</span>
            </Link>
            <Link to='/profile'>
              <img src={logo} alt='myPhoto' />
            </Link>
            <button className='btn-out' onClick={handleLogOut}>
              Log out
            </button>
          </>
        ) : (
          <>
            <h2>
              <Link to='/'>RealWorld Blog</Link>
            </h2>
            <button className='btn-in'>
              <Link to='/sign-in'>Sign In</Link>
            </button>
            <button className='btn-up'>
              <Link to='/sign-up'>Sign Up</Link>
            </button>
          </>
        )}
      </header>
    </>
  );
}
