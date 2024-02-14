import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import heart from './heart.svg';
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
          <img src={heart} alt='likes' />
          <span>{favoritesCount}</span>
          {tagList.map((tag) => {
            return (
              <span key={Math.random()} className='tag'>
                {tag}
              </span>
            );
          })}
        </div>
        <div className='avatar'>
          <span>
            {' '}
            <span className='name'>{author.username}</span>
            <span>{format(new Date(createdAt), 'MMM dd, yyyy')}</span>
          </span>
          <img src={author.image} alt='myPhoto' />
        </div>
      </div>
      <p>{description}</p>
    </div>
  );
}
