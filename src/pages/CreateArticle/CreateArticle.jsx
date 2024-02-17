import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './CreateArticle.scss';
import { Alert } from 'antd';

export default function CreateArticle() {
  const [addArticle, setAddArticle] = useState(false);

  const { jwt } = useSelector((state) => state.user);

  const nav = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    reset,
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
      await axios.post('https://blog.kata.academy/api/articles', validData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${jwt}`,
        },
      });
      setAddArticle(true);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!jwt) {
      nav('/sign-in');
    }
    append({ tag: '' });
  }, [jwt, nav, append]);

  return (
    <div className='create-article'>
      <h2>Create new article</h2>
      {addArticle && <Alert type='success' message='article add' />}
      <form className='create-article' onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='title'>Title</label>
        {errors.title && <span className='error'>Title is required</span>}
        <input
          className='input'
          id='title'
          type='text'
          placeholder='Title'
          {...register('title', { required: true })}
        />

        <label htmlFor='description'>Short description</label>
        {errors.description && <span className='error'>Short description is required</span>}
        <input
          className='input'
          id='description'
          type='text'
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
