import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const { jwt } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      if (!jwt) {
        nav('/sign-in');
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [jwt, nav]);

  return <>{loading ? <h2>Loading...</h2> : <h2>Привет, авторизованный пользователь</h2>}</>;
}
