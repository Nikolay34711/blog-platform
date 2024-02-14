import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ArticlesList from '../ArticlesList/ArticlesList';
import ArticlesPage from '../ArticlePage/ArticlePage';
import Header from '../Header/Header';
import './App.scss';

export default function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Header />}>
            <Route index element={<ArticlesList />}></Route>
            <Route path='articles' element={<ArticlesList />}></Route>
            <Route path='articles/:slug' element={<ArticlesPage />}></Route>
            <Route path='*' element={<h2>Not found</h2>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
