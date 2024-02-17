import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import noLike from '../../icon/noLike.svg';
import formattedDate from '../../utils/formattedDate';
import './Article.scss';

export default function Article({ article }) {
  const { title, description, author, createdAt, tagList, favoritesCount, slug } = article;

  return (
    <div className='article'>
      <div className='header-article'>
        <div className='title'>
          {
            <h2>
              <Link to={`/articles/${slug}`}>{title}</Link>
            </h2>
          }
          <img src={noLike} alt='likes' />
          <span>{favoritesCount}</span>
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
