import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    // console.log({ email, password });
  };
  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <section className='container'>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Sign Into Your Account
      </p>
      <form className='form' onSubmit={onSubmit}>
        {[
          {
            type: 'email',
            name: 'email',
            placeholder: 'Email Address',
            value: email,
          },
          {
            type: 'password',
            name: 'password',
            placeholder: 'Password',
            value: password,
            minLength: 4,
          },
        ].map(({ type, name, placeholder, value, minLength }) => (
          <div className='form-group' key={name}>
            <input
              type={type}
              name={name}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              required
              minLength={minLength}
            />
          </div>
        ))}
        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </section>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
