import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import heart from './heart.svg';
import './ArticlePage.scss';

export default function ArticlesPage() {
  const { articles } = useSelector((state) => state.articles);
  const { slug } = useParams();

  const article = articles.find((article) => article.slug === slug);

  const { title, description, author, createdAt, tagList, favoritesCount, body } = article;

  return (
    <div className='article-page'>
      <div className='header-article'>
        <div className='title'>
          {<h2>{title}</h2>}
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
          <div>
            <button className='btn-del'>DELETE</button>
            <button className='btn-edit'>
              <Link to={`/articles/${slug}/edit`}>EDIT</Link>
            </button>
          </div>
        </div>
      </div>
      <p>{description}</p>
      <ReactMarkdown>{body}</ReactMarkdown>
    </div>
  );
}
