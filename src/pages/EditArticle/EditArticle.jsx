import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Alert } from 'antd';
import '../CreateArticle/CreateArticle.scss';

export default function EditArticle() {
  const [upArticle, setUpArticle] = useState(false);
  const { jwt } = useSelector((state) => state.user);
  const { slug } = useParams();
  const { articles } = useSelector((state) => state.articles);

  const article = articles.find((article) => article.slug === slug);

  const { title, description, tagList, body } = article;

  const nav = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  });

  const addTag = () => {
    append({ tag: '' });
  };

  const deleteTag = (index) => {
    remove(index);
  };

  const onSubmit = async (data) => {
    const validData = {
      article: {
        title: data.title,
        description: data.description,
        body: data.body,
        tagList: data.tags.map((tag) => tag.tag),
      },
    };
    try {
      await axios.put(`https://blog.kata.academy/api/articles/${slug}`, validData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${jwt}`,
        },
      });
      setUpArticle(true);
    } catch (error) {
      setUpArticle(false);
      console.error(error);
    }
  };

  useEffect(() => {
    if (!jwt) {
      nav('/sign-in');
    }

    if (tagList.length) {
      tagList.map((tag) => append({ tag: tag }));
    } else {
      append({ tag: '' });
    }
  }, [jwt, nav, tagList, append]);

  return (
    <div className='create-article'>
      <h2>Edit article</h2>
      {upArticle && <Alert type='success' message='article update!' />}
      <form className='create-article' onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='title'>Title</label>
        {errors.title && <span className='error'>Title is required</span>}
        <input
          className='input'
          id='title'
          type='text'
          placeholder='Title'
          defaultValue={title}
          {...register('title', { required: true })}
        />

        <label htmlFor='description'>Short description</label>
        {errors.description && <span className='error'>Short description is required</span>}
        <input
          className='input'
          id='description'
          type='text'
          defaultValue={description}
          placeholder='Short description'
          {...register('description', { required: true })}
        />

        <label htmlFor='body'>Text</label>
        {errors.body && <span className='error'>Text is required</span>}
        <textarea
          name='text'
          id='body'
          cols='30'
          rows='10'
          placeholder='Text'
          defaultValue={body}
          {...register('body', { required: true })}
        ></textarea>

        <label htmlFor='tag'>Tags</label>
        <div className='tags'>
          {fields.map((tag, index) => (
            <div key={tag.id}>
              <input
                className='tag'
                type='text'
                placeholder='Tag'
                {...register(`tags.${index}.tag`, { required: true })}
                defaultValue={tag.tag}
              />
              <button type='button' className='del' onClick={() => deleteTag(index)}>
                DELETE
              </button>
              {errors.tags && errors.tags[index]?.tag && (
                <span className='error'>Tag is required</span>
              )}
            </div>
          ))}
          <button type='button' className='add' onClick={addTag}>
            ADD TAG
          </button>
        </div>
        <button type='submit' className='send'>
          SEND
        </button>
      </form>
    </div>
  );
}
