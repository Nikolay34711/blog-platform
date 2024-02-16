import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jwt: localStorage.getItem('token') ?? null,
  username: localStorage.getItem('username') ?? '',
  email: localStorage.getItem('email') ?? '',
};

const userAuth = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth(state, action) {
      const { token: jwt, username, email } = action.payload;
      state.jwt = jwt;
      state.username = username;
      state.email = email;
    },
  },
});
export const { setAuth } = userAuth.actions;
export default userAuth.reducer;
