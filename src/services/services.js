import { message } from 'antd';
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
    localStorage.setItem('token', res.data.user.token);
    localStorage.setItem('username', res.data.user.username);
    localStorage.setItem('email', res.data.user.email);
    localStorage.setItem('image', res.data.user.image);
    return res;
  } catch (error) {
    console.error(error);
  }
};

const registration = async (user) => {
  try {
    const res = await axios.post(
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
    return res;
  } catch (error) {
    const res = JSON.parse(error.response.request.response);
    if ('username' in res.errors && 'email' in res.errors) {
      message.error('This email address and nickname are already registered');
    } else if ('username' in res.errors) {
      message.error('this nickname is already taken');
    } else if ('email' in res.errors) {
      message.error('This email is already registered');
    }
    console.error('Ошибка при регистрации пользователя:', error);
    throw new Error('Failed to create account');
  }
};

const deleteArticle = async (slug, jwt) => {
  try {
    const res = await axios.delete(`${BASE_URL}articles/${slug}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${jwt}`,
      },
    });
    return res;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete article');
  }
};

const createArticle = async (data, jwt) => {
  const validData = {
    article: {
      title: data.title,
      description: data.description,
      body: data.body,
      tagList: data.tags.map((tag) => tag.tag),
    },
  };
  try {
    const res = await axios.post(`${BASE_URL}articles`, validData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${jwt}`,
      },
    });
    return res;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to add article');
  }
};

const updateArticle = async (data, jwt, slug) => {
  const validData = {
    article: {
      title: data.title,
      description: data.description,
      body: data.body,
      tagList: data.tags.map((tag) => tag.tag),
    },
  };
  try {
    const res = await axios.put(`${BASE_URL}articles/${slug}`, validData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${jwt}`,
      },
    });
    return res;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to update article');
  }
};

const updateProfile = async (data, jwt) => {
  try {
    const response = await axios.put(
      `${BASE_URL}user`,
      { user: { ...data } },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${jwt}`,
        },
      },
    );
    return response;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw new Error('Failed to update profile');
  }
};

export {
  getCountArticles,
  login,
  registration,
  deleteArticle,
  createArticle,
  updateArticle,
  updateProfile,
};
