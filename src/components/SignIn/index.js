import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { emailSignInStart, googleSignInStart } from './../../redux/User/user.actions';
import {ImSpinner3} from "react-icons/im";

import './styles.scss';

import AuthWrapper from './../AuthWrapper';
import FormInput from './../forms/FormInput';
import Button from './../forms/Button';

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userErr: user.userErr
});


const SignIn = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser , userErr } = useSelector(mapState);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [submit, setSubmit] = useState(false)
  const [errors, setErrors] = useState([]);


  useEffect(() => {
    if (currentUser) {
      resetForm();
      history.push('/');
    }

  }, [history, currentUser]);

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setErrors([]);

  };


  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setErrors(userErr);
    }

  }, [userErr]);

  const handleSubmit = e => {
    e.preventDefault();
    setSubmit(true)
    dispatch(emailSignInStart({ email, password }));
    if (errors) {
      setSubmit(false)
      setTimeout(() => {
        setErrors([])
      }, 5000);
    }
  }


  const handleGoogleSignIn = () => {
    dispatch(googleSignInStart());
  }

  const configAuthWrapper = {
    headline: 'LogIn'
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">

        {errors.length > 0 && (
          <ul>
            {errors.map((err, index) => {
              return (
                <li style={{listStyle: "none", color: "#c51244", textAlign: "center", marginLeft: "-40px"}} key={index}>
                  {err}
                </li>
              );
            })}
          </ul>
        )}

        <form onSubmit={handleSubmit}>

          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={e => setEmail(e.target.value)}
          />

          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            handleChange={e => setPassword(e.target.value)}
          />

          <Button type="submit">
            {!submit ? "LogIn" : <ImSpinner3/>}
          </Button>

          <div className="socialSignin">
            <div className="row">
              <Button onClick={handleGoogleSignIn}>
                Sign in with Google
              </Button>
            </div>
          </div>

          <div className="links">
            <Link to="/registration">
              Register
            </Link>
            {` | `}
            <Link to="/recovery">
              Reset Password
            </Link>
          </div>

        </form>
      </div>
    </AuthWrapper>
  );
}

export default SignIn;
