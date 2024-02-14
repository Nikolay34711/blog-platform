import axios from 'axios';

export const utilsArticles = async () => {
  try {
    const res = await axios.get('https://blog.kata.academy/api/articles');
    return res.data.articles;
  } catch (error) {
    throw error.message;
  }
};
