import { Outlet } from 'react-router-dom';
import './Header.scss';

export default function Header() {
  return (
    <>
      <header className='header-not-registered'>
        <h2>RealWorld Blog</h2>
        <button className='btn-in'>Sign In</button>
        <button className='btn-up'>Sign Up</button>
      </header>
        <Outlet />
    </>
  );
}
