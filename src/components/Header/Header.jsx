import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Header.scss';

export default function Header() {
  const { jwt } = useSelector((state) => state.user);

  return (
    <>
      <header className='header-not-registered'>
        {jwt ? (
          <>
            <button className='btn-in'>create article</button>
            <button className='btn-up'>Log out</button>
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
