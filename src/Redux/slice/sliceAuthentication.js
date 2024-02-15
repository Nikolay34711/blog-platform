import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jwt: null,
};

const userAuth = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth(state, action) {
      state.jwt = action.payload;
    },
  },
});
export const { setAuth } = userAuth.actions;
export default userAuth.reducer;
