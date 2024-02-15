import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ArticlesList from '../ArticlesList/ArticlesList';
import ArticlesPage from '../../pages/ArticlePage/ArticlePage';
import Header from '../Header/Header';
import SignUpForm from '../../pages/SignUp/SignUpForm';
import SignInForm from '../../pages/SignIn/SignInForm';
import AuthPage from '../../pages/AuthPage/AuthPage';
import './App.scss';

export default function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Header />}>
            <Route index element={<ArticlesList />} />
            <Route path='articles' element={<ArticlesList />} />
            <Route path='articles/:slug' element={<ArticlesPage />} />
            <Route path='*' element={<h2>Not found</h2>} />
            <Route path='/sign-in' element={<SignInForm />} />
            <Route path='/sign-up' element={<SignUpForm />} />
            <Route path='/auth-page' element={<AuthPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
