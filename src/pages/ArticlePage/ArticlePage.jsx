import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { Popconfirm, message } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import heart from './heart.svg';
import './ArticlePage.scss';

export default function ArticlesPage() {
  const { jwt } = useSelector((state) => state.user);
  const { articles } = useSelector((state) => state.articles);
  const { slug } = useParams();
  const nav = useNavigate();

  const article = articles.find((article) => article.slug === slug);

  const { title, description, author, createdAt, tagList, favoritesCount, body } = article;

  function confirm() {
    message.info('Clicked on Yes.');
    const deleteArticle = async () => {
      try {
        await axios.delete(`https://blog.kata.academy/api/articles/${slug}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${jwt}`,
          },
        });
        nav('/');
      } catch (error) {
        console.error(error);
      }
    };

    deleteArticle();
  }

  function cancel() {
    message.error('Clicked on No.');
  }

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
          {author.username === localStorage.getItem('username') ? (
            <div>
              <Popconfirm
                title='Are you sure you want to delete this article?'
                onConfirm={confirm}
                onCancel={cancel}
                okText='Yes'
                cancelText='No'
                placement={'bottom'}
              >
                <button className='btn-del'>DELETE </button>
              </Popconfirm>

              <button className='btn-edit'>
                <Link to={`/articles/${slug}/edit`}>EDIT</Link>
              </button>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      <p>{description}</p>
      <ReactMarkdown>{body}</ReactMarkdown>
    </div>
  );
}
