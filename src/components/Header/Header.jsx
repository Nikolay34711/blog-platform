import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../../Redux/slice/sliceAuthentication';
import './Header.scss';
import { useEffect } from 'react';

export default function Header() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { jwt, username, image } = useSelector((state) => state.user);

  useEffect(() => {
    if (!jwt) {
      nav('/sign-in');
    }
  }, [jwt, nav]);

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
            <Link to='/new-article'>
              <button className='btn-create'>create article</button>
            </Link>
            <Link to='/profile'>
              <span className='name'>{username}</span>
            </Link>
            <Link to='/profile'>
              <img
                style={{ width: '46px', height: '46px', borderRadius: '5px' }}
                src={image}
                alt='myPhoto'
              />
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
