import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from './slice/sliceArticles';
import pageNumReducer from './slice/slicePage';

const store = configureStore({
  reducer: {
    articles: articlesReducer,
    page: pageNumReducer,
  },
});

export default store;
