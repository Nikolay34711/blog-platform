import axios from 'axios';

const BASE_URL = 'https://blog.kata.academy/api/';

const getCountArticles = async () => {
  try {
    const res = await axios.get(`${BASE_URL}articles`);
    return res.data.articlesCount;
  } catch (error) {
    throw error;
  }
};

const login = async (user) => {
  try {
    const res = await axios.post(`${BASE_URL}users/login`, { user });
    const token = res.data.user.token;
    localStorage.setItem('token', token);
    return res;
  } catch (error) {
    console.error(error);
  }
};

const registration = async (user) => {
  try {
    await axios.post(
      `${BASE_URL}users`,
      {
        user: user,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    console.error('Ошибка при регистрации пользователя:', error);
  }
};

export { getCountArticles, login, registration };
