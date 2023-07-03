import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'reactstrap';

import RegisterInput from '../components/RegisterInput';
import Notify from '../components/Notify';

import {
    API_URL,
    NO_INPUT,
    USER_EXISTS,
    RATE_LIMITED,
    SUCCESS
} from '../helpers/configuration';

function Register() {

    const navigate = useNavigate();

    // Form Data
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    // Error Handling
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Rate Limiting
    const [enter, setEnter] = useState(false);
    const [rateLimit, setRateLimit] = useState(0);

    const register = () => {
        const url = `${API_URL}/user/register`;

        // Check Passwords
        if (password !== passwordConfirm) {
            setError("Passwords do not match");
            return;
        }

        // Fetch POST Request
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            // Send POST body with email and password
            body: JSON.stringify({ email, password }),
        })
            .then((res) => {

                // Collect Errors
                if (res.status === 400) { throw new Error(NO_INPUT) }
                if (res.status === 409) { throw new Error(USER_EXISTS) }
                if (res.status === 429) {
                    setRateLimit(res.headers.get('RateLimit-Reset'));
                    throw new Error(RATE_LIMITED)
                }

                setSuccess(SUCCESS);
                redirect();

            })
            .catch((error) => {

                // Handle Errors
                if (error.message === NO_INPUT) { setError(NO_INPUT) }
                if (error.message === USER_EXISTS) { setError(USER_EXISTS) }
                if (error.message === RATE_LIMITED) {
                    setError(RATE_LIMITED + `... Disabling Registration for ${rateLimit} Seconds`);
                    setTimeout(() => {
                        setEnter(false);
                    }, rateLimit * 1000)
                    setEnter(true);
                }
                else { setError(error.message) }
            })
    };


    // Redirect Once Successfully Registered
    const redirect = () => {
        setTimeout(() => {
            navigate('/login');
        }, 2000);
    };


    return (
        <div className='loginInput'>
            <h1>REGISTER</h1>

            <Notify prompt={error} color='danger' />
            <Notify prompt={success} />

            <RegisterInput
                email={email}
                password={password}
                passwordConfirm={passwordConfirm}
                setEmail={setEmail}
                setPassword={setPassword}
                setPasswordConfirm={setPasswordConfirm} />

            <Button
                color='primary'
                disabled={enter}
                onClick={() => {
                    register()
                }}>
                CREATE ACCOUNT ➜
            </Button>
        </div>
    )
}

export default Register;