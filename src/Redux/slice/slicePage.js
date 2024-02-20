import { createSlice } from '@reduxjs/toolkit';

const initialState = 1;

const pageNum = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPage(_, action) {
      const newPage = action.payload;
      localStorage.setItem('currentPage', newPage);
      return newPage;
    },
  },
});

export const { setPage } = pageNum.actions;

export default pageNum.reducer;
