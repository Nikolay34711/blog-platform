import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import noLike from '../../icon/noLike.svg';
import like from '../../icon/like.svg';
import formattedDate from '../../utils/formattedDate';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './Article.scss';
import { useState } from 'react';

export default function Article({ article }) {
  const { jwt } = useSelector((state) => state.user);
  const { title, description, author, favorited, createdAt, tagList, favoritesCount, slug } =
    article;

  const [favoriteBool, setFavoriteBool] = useState(favorited);
  const [countLike, setCountLike] = useState(favoritesCount);

  const handleLike = async () => {
    if (favoriteBool) {
      try {
        await axios.request({
          url: `https://blog.kata.academy/api/articles/${slug}/favorite`,
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${jwt}`,
          },
        });
        setFavoriteBool(false);
        setCountLike(countLike - 1);
      } catch (error) {
        console.error(error);
        throw new Error('Failed to add article to favorites');
      }
    } else {
      try {
        await axios.request({
          url: `https://blog.kata.academy/api/articles/${slug}/favorite`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${jwt}`,
          },
        });
        setFavoriteBool(true);
        setCountLike(countLike + 1);
      } catch (error) {
        console.error(error);
        throw new Error('Failed to add article to favorites');
      }
    }
  };

  return (
    <div className='article'>
      <div className='header-article'>
        <div className='title'>
          {
            <h2>
              <Link to={`/articles/${slug}`}>{title}</Link>
            </h2>
          }
          <img src={favoriteBool ? like : noLike} alt='likes' onClick={handleLike} />
          <span>{countLike}</span>
          {tagList.map((tag) => {
            return (
              <span key={uuidv4()} className='tag'>
                {tag}
              </span>
            );
          })}
        </div>
        <div className='avatar'>
          <span>
            {' '}
            <span className='name'>{author?.username}</span>
            <span>{formattedDate(createdAt)}</span>
          </span>
          <img src={author?.image} alt='avatar' />
        </div>
      </div>
      <p>{description}</p>
    </div>
  );
}
