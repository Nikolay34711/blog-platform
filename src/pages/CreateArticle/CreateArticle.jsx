import './CreateArticle.scss';

export default function CreateArticle() {
  return (
    <div className='create-article'>
      <h2>Create new article</h2>
      <label htmlFor='title'>Title</label>
      <input id='title' type='text' placeholder='Title' />
      <label htmlFor='descr'>Short description</label>
      <input id='descr' type='text' placeholder='Short description' />
      <label htmlFor='text'>Text</label>
      <textarea name='text' id='text' cols='30' rows='10' placeholder='Text'></textarea>
      <label htmlFor='tag'>Tags</label>
      <div className='tags'>
        <input id='tag' type='text' placeholder='Tag' />
        <button className='del'>DELETE</button>
        <button className='add'>ADD TAG</button>
      </div>
      <button className='send'>SEND</button>
    </div>
  );
}
