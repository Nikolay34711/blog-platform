import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { setPage } from '../../Redux/slice/slicePage';
import { getCountArticles } from '../../services/services';

export default function BasicPagination() {
  const [articlesCount, setArticlesCount] = useState(0);
  const page = useSelector((state) => state.page);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const count = await getCountArticles();
      setArticlesCount(count);
    };

    fetchData();
  }, []);

  return (
    <Stack spacing={2} sx={{ justifyContent: 'center', alignItems: 'center', margin: '25px' }}>
      <Pagination
        count={Math.ceil(articlesCount / 10)}
        page={page}
        onChange={(_, num) => dispatch(setPage(num))}
        color='primary'
      />
    </Stack>
  );
}
