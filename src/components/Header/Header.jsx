import { Link, Outlet } from 'react-router-dom';
import './Header.scss';

export default function Header() {
  return (
    <>
      <header className='header-not-registered'>
        <h2>RealWorld Blog</h2>
        <button className='btn-in'>
          <Link to='/sign-in'>Sign In</Link>
        </button>
        <button className='btn-up'>Sign Up</button>
      </header>
      <Outlet />
    </>
  );
}
