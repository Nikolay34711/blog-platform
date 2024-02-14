import axios from 'axios';

const BASE_URL = 'https://blog.kata.academy/api/articles';

const getCountArticles = async () => {
  try {
    const res = await axios.get(BASE_URL);
    return res.data.articlesCount;
  } catch (error) {
    throw error.message;
  }
};

export { getCountArticles };
