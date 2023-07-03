import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  Container
} from 'reactstrap';

import LoginInput from '../components/LoginInput';
import Notify from '../components/Notify';

import {
  API_URL,
  NO_INPUT,
  WRONG_INPUT,
  RATE_LIMITED,
  SUCCESS
} from '../helpers/configuration';

function Login() {

  const navigate = useNavigate();

  // Form Data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Error Handling
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [enter, setEnter] = useState(false);
  const [rateLimit, setRateLimit] = useState(0);


  const login = () => {
    const url = `${API_URL}/user/login`;

    // Fetch POST Request
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {

        // Collect Errors
        if (res.status === 400) { throw new Error(NO_INPUT) }
        if (res.status === 401) { throw new Error(WRONG_INPUT) }
        if (res.status === 429) {
          setRateLimit(res.headers.get('RateLimit-Reset'));
          throw new Error(RATE_LIMITED)
        }

        return res.json();

      })
      .then((res) => {

        // Set Tokens
        localStorage.setItem('token', res.bearerToken.token);
        localStorage.setItem('refresh', res.refreshToken.token);

        // Caculate Token Expiry Unix Timestamp
        localStorage.setItem('expiration', Date.now() + res.bearerToken.expires_in * 1000);
        localStorage.setItem('refresh_expiration', Date.now() + res.refreshToken.expires_in * 1000);


        // Store Username for Navbar
        localStorage.setItem('username', email)

        setSuccess(SUCCESS);
        redirect();

      })
      .catch((error) => {

        // Handle Errors
        if (error.message === NO_INPUT) { setError(NO_INPUT) }
        else if (error.message === WRONG_INPUT) { setError(WRONG_INPUT) }
        else if (error.message === RATE_LIMITED) {
          setError(RATE_LIMITED + `... Disabling Login for ${rateLimit} Seconds`);
          setTimeout(() => {
            setEnter(false);
          }, rateLimit * 1000)
          setEnter(true);
        }
        else { console.log(error) }

      })
  };

  // Redirect to Home - Reload Required for Navbar Update
  const redirect = () => {
    setTimeout(() => {
      navigate('/');
      window.location.reload();
    }, 2000);
  }


  return (
    <Container className='loginInput'>

      <h1>LOGIN</h1>

      <Notify prompt={error} color='danger' />
      <Notify prompt={success} />

      <LoginInput className='loginInput'
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
      />

      <Button
        color='primary'
        disabled={enter}
        onClick={() => {
          login()
        }}>
        ENTER ➜
        </Button>
    </Container>

  );
}

export default Login;