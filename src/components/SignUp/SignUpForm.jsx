import './SignUpForm.scss';

export default function SignUpForm() {
  return (
    <div className='sign-up-form'>
      <h2>Sign Up</h2>
      <form>
        <label htmlFor='username' className='username'>
          Username
          <input type='text' id='username' placeholder='some-username' />
        </label>

        <label htmlFor='email' className='email'>
          Email address
          <input type='email' id='email' placeholder='Email address' />
        </label>

        <label htmlFor='pass' className='pass'>
          Password
          <input type='password' id='pass' placeholder='Password' />
        </label>

        <label htmlFor='repeat'>
          Repeat Password
          <input type='password' id='repeat' placeholder='Password' />
        </label>

        <label htmlFor='check' className='check'>
          <input type='checkbox' id='check' placeholder='Password' />I agree to the processing of my
          personal information
        </label>

        <button>Create</button>

        <span>
          Already have an account ? <a href='#'>Sign In.</a>
        </span>
      </form>
    </div>
  );
}
