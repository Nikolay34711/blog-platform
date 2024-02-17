import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import noLike from '../../icon/noLike.svg';
import like from '../../icon/like.svg';
import formattedDate from '../../utils/formattedDate';
import { useSelector } from 'react-redux';
import { Liked, disLiked } from '../../services/services';
import { cutTag, cutText } from '../../utils/cutText';
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
              <Link to={`/articles/${slug}`}>{cutText(title)}</Link>
            </h2>
          }
          <img src={favoriteBool ? like : noLike} alt='likes' onClick={handleLike} />
          <span>{countLike}</span>
          {tagList.map((tag) => {
            return (
              <span key={uuidv4()} className='tag'>
                {cutTag(tag)}
              </span>
            );
          })}
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
      <p>{cutText(description)}</p>
    </div>
  );
}
