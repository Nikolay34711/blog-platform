import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jwt: localStorage.getItem('token') ?? null,
  username: localStorage.getItem('username') ?? '',
};

const userAuth = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth(state, action) {
      const { token: jwt, username } = action.payload;
      state.jwt = jwt;
      state.username = username;
    },
  },
});
export const { setAuth } = userAuth.actions;
export default userAuth.reducer;
