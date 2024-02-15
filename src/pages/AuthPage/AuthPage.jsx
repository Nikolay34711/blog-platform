import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const { jwt } = useSelector((state) => state.user);
  const nav = useNavigate();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (!jwt) {
      nav('/sign-up');
    }
    setLoad(true);
  }, [jwt, nav]);

  return <>{load ? <h2>Привет зареганый юзер</h2> : 'load...'}</>;
}
