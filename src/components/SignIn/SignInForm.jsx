import './SignInForm.scss';

export default function SignInForm() {
  return (
    <div className='sign-in-form'>
      <h2>Sign In</h2>
      <form>
        <label htmlFor='email' className='email'>
          Email address
          <input type='email' id='email' placeholder='Email address' />
        </label>
        <label htmlFor='pass' className='pass'>
          Password
          <input type='password' id='pass' placeholder='Password' />
        </label>
        <button>Login</button>
        <span>
          Dont't have an account? <a href='#'>Sign Up.</a>
        </span>
      </form>
    </div>
  );
}
