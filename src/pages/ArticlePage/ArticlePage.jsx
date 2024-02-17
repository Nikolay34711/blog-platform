import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Popconfirm, message } from 'antd';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import ReactMarkdown from 'react-markdown';
import formattedDate from '../../utils/formattedDate';
import { deleteArticle } from '../../services/services';
import like from '../../icon/like.svg';
import noLike from '../../icon/noLike.svg';
import './ArticlePage.scss';

export default function ArticlesPage() {
  const nav = useNavigate();
  const { slug } = useParams();
  const { jwt } = useSelector((state) => state.user);
  const { articles } = useSelector((state) => state.articles);

  const article = articles.find((article) => article.slug === slug);
  const { title, description, author, favorited, createdAt, tagList, favoritesCount, body } =
    article;

  async function confirm() {
    try {
      await deleteArticle(slug, jwt);
      message.info('article deleted');
      setTimeout(() => nav('/'), 1000);
    } catch (error) {
      console.error('Error deleting article:', error);
      message.error('Failed to delete article');
    }
  }

  function cancel() {
    message.error('cancel');
  }

  return (
    <div className='article-page'>
      <div className='header-article'>
        <div className='title'>
          {<h2>{title}</h2>}
          <img src={favorited ? like : noLike} alt='likes' />
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
            <span className='name'>{author.username}</span>
            <span>{formattedDate(createdAt)}</span>
          </span>
          <img src={author?.image} alt='myPhoto' />
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
