import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from './Rectangle 1.svg';
import './Header.scss';

export default function Header() {
  const { jwt, username } = useSelector((state) => state.user);

  return (
    <>
      <header className='header'>
        {jwt ? (
          <>
            <h2>
              <Link to='/'>RealWorld Blog</Link>
            </h2>
            <button className='btn-create'>create article</button>
            <span className='name'>{username}</span>
            <img src={logo} alt='' />
            <button className='btn-out'>Log out</button>
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
