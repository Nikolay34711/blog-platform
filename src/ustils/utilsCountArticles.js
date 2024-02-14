import axios from 'axios';

const utilsCountArticles = async () => {
  try {
    const res = await axios.get(`https://blog.kata.academy/api/articles`);
    return res.data.articlesCount;
  } catch (error) {
    throw error.message;
  }
};

export default utilsCountArticles;
