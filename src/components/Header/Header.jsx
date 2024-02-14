import { Link, Outlet } from 'react-router-dom';
import './Header.scss';

export default function Header() {
  return (
    <>
      <header className='header-not-registered'>
        <h2>
          <Link to='/'>RealWorld Blog</Link>
        </h2>
        <button className='btn-in'>
          <Link to='/sign-in'>Sign In</Link>
        </button>
        <button className='btn-up'>
          <Link to='/sign-up'>Sign Up</Link>
        </button>
      </header>
      <Outlet />
    </>
  );
}
