import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { sliceArticles } from '../../Redux/slice/sliceArticles';
import BasicPagination from '../Pagination/Pagination';
import { CircularProgress, Alert } from '@mui/material';
import Article from '../Article/Article';
import './ArticlesList.scss';

export default function ArticlesList() {
  const dispatch = useDispatch();

  const page = useSelector((state) => state.page);
  const { articles, isLoad, error } = useSelector((state) => state.articles);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(sliceArticles((page - 1) * 10));
    };
    fetchData();
  }, [dispatch, page]);

  return (
    <>
      {isLoad && articles ? (
        articles.map((article) => {
          return <Article key={Math.random()} article={article} />;
        })
      ) : error ? (
        <Alert severity='error'>Зачем сломал мой сайт?</Alert>
      ) : (
        <CircularProgress size={20} thickness={4} />
      )}
      <BasicPagination />
    </>
  );
}
