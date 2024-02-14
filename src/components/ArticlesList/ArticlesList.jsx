import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { sliceArticles } from '../../Redux/slice/sliceArticles';
import BasicPagination from '../Pagination/Pagination';
import Article from '../Article/Article';
import './ArticlesList.scss';

export default function ArticlesList() {
  const dispatch = useDispatch();

  const page = useSelector((state) => state.page);
  const { articles, isLoad } = useSelector((state) => state.articles);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(sliceArticles((page - 1) * 10));
      } catch (error) {
        throw error.message;
      }
    };
    fetchData();
  }, [dispatch, page]);

  return (
    <>
      {isLoad && articles
        ? articles.map((article) => {
            return <Article key={Math.random()} article={article} />;
          })
        : 'load...'}
      <BasicPagination />
    </>
  );
}
