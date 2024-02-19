import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ArticlesList from '../ArticlesList/ArticlesList';
import ArticlesPage from '../../pages/ArticlePage/ArticlePage';
import SignUpForm from '../../pages/SignUp/SignUpForm';
import SignInForm from '../../pages/SignIn/SignInForm';
import MainLayout from '../MainLayout/MainLayout';
import EditProfile from '../../pages/EditProfile/EditProfile';
import CreateArticle from '../../pages/CreateArticle/CreateArticle';
import EditArticle from '../../pages/EditArticle/EditArticle';

export default function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            {/* Страница со списоком постов и страница поста */}
            <Route index element={<ArticlesList />} />
            <Route path='articles' element={<ArticlesList />} />
            <Route path='articles/:slug' element={<ArticlesPage />} />

            {/* Страницы входа и регистрации */}
            <Route path='sign-in' element={<SignInForm />} />
            <Route path='sign-up' element={<SignUpForm />} />

            {/* Страница создания поста */}
            <Route path='new-article' element={<CreateArticle />} />

            {/* Страницы редактиварония поста и профиля */}
            <Route path='profile' element={<EditProfile />} />
            <Route path='articles/:slug/edit' element={<EditArticle />} />

            {/* Если страница не найдена */}
            <Route path='*' element={<h2>Not found</h2>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
