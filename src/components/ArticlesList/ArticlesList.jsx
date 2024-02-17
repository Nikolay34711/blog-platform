import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { sliceArticles } from '../../Redux/slice/sliceArticles';
import BasicPagination from '../Pagination/Pagination';
import { v4 as uuidv4 } from 'uuid';
import { CircularProgress, Alert } from '@mui/material';
import Article from '../Article/Article';

export default function ArticlesList() {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page);
  const { articles, isLoad, error } = useSelector((state) => state.articles);

  useEffect(() => {
    dispatch(sliceArticles((page - 1) * 10));
  }, [dispatch, page]);

  return (
    <>
      {isLoad && articles ? (
        articles.map((article) => {
          return <Article key={uuidv4()} article={article} />;
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
