import { useState, useCallback } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, isAuthenticated, register }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = useCallback(
    (e) => setFormData({ ...formData, [e.target.name]: e.target.value }),
    [formData]
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password, password2 });
      // console.log({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }
  return (
    <section className='container'>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Create Your Account
      </p>
      <form className='form' onSubmit={onSubmit}>
        {[
          { type: 'text', name: 'name', placeholder: 'Name', value: name },
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
            minLength: 6,
          },
          {
            type: 'password',
            name: 'password2',
            placeholder: 'Confirm Password',
            value: password2,
            minLength: 6,
          },
        ].map(({ type, name, placeholder, value }) => (
          <div className='form-group' key={name}>
            <input
              type={type}
              name={name}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              // required
            />
            {name === 'email' && (
              <small className='form-text'>
                This site uses Gravatar so if you want a profile image, use a
                Gravatar email
              </small>
            )}
          </div>
        ))}
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </section>
  );
};
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
