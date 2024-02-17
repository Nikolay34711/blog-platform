import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import noLike from '../../icon/noLike.svg';
import like from '../../icon/like.svg';
import formattedDate from '../../utils/formattedDate';
import { useSelector } from 'react-redux';
import { Liked, disLiked } from '../../services/services';
import { truncate } from '../../utils/cutText';
import { useState } from 'react';
import './Article.scss';

export default function Article({ article }) {
  const { jwt } = useSelector((state) => state.user);
  const { title, description, author, favorited, createdAt, tagList, favoritesCount, slug } =
    article;

  const [favoriteBool, setFavoriteBool] = useState(favorited);
  const [countLike, setCountLike] = useState(favoritesCount);

  const handleLike = async () => {
    if (favoriteBool) {
      try {
        await Liked(jwt, slug);
        setFavoriteBool(false);
        setCountLike(countLike - 1);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await disLiked(jwt, slug);
        setFavoriteBool(true);
        setCountLike(countLike + 1);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className='article'>
      <div className='header-article'>
        <div className='title'>
          {
            <h2>
              <Link to={`/articles/${slug}`}>{truncate(title, 20)}</Link>
            </h2>
          }
          <span className='like'>
            <img src={favoriteBool ? like : noLike} alt='likes' onClick={handleLike} />
            <span>{countLike}</span>
          </span>
          <ul>
            {tagList.map((tag) => {
              return (
                <li key={uuidv4()} className='tag'>
                  {truncate(tag)}
                </li>
              );
            })}
          </ul>
        </div>
        <div className='avatar'>
          <span className='container-avatar'>
            {' '}
            <span className='name'>{author?.username}</span>
            <span>{formattedDate(createdAt)}</span>
          </span>
          <img src={author?.image} alt='avatar' />
        </div>
      </div>
      <p>{truncate(description, 30)}</p>
    </div>
  );
}
