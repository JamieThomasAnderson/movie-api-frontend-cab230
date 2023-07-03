import { useState } from "react";
import { Button } from "reactstrap";
import { useNavigate } from 'react-router-dom';

import Notify from "../components/Notify";

import {
  API_URL,
  INVALIDATED,
  BAD_REQUEST,
  SUCCESS
} from "../helpers/configuration";

import { RATE_LIMITED } from "../helpers/configuration";

export default function Logout() {

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // POST Request w/ Refresh Token for Invalidation
  const logout = () => {
    const url = `${API_URL}/user/logout`;
    const refresh = localStorage.getItem("refresh");

    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      // Send POST Body with refreshToken
      body: JSON.stringify({ refreshToken: refresh }),
    })
      .then((res) => {
        if (res.status === 400) { throw new Error(BAD_REQUEST) }
        if (res.status === 401) { throw new Error(INVALIDATED) }
        if (res.status === 429) { throw new Error(RATE_LIMITED) }
        if (res.status === 200) { setSuccess(SUCCESS) };
        return res.json();
      })
      .catch((error) => {
        if (error.message === BAD_REQUEST) { setError(BAD_REQUEST) }
        if (error.message === INVALIDATED) { setError(INVALIDATED) }
        if (error.message === RATE_LIMITED) { setError(RATE_LIMITED) }
        else { setError(error.message) }
      });

  }


  const cleanup = () => {
    localStorage.clear("username");
    localStorage.clear("expiration");
    localStorage.clear("token");
    localStorage.clear("refresh");

    setTimeout(() => {
      navigate('/');
      window.location.reload();
    }, 2000);
  }

  return (
    <div className="container">
      <h1 id="logout">Are You Sure?</h1>

      <Notify
        prompt={error}
        color={"danger"} />

      <Notify
        prompt={success}
        color={"success"} />

      <div className="logoutStyling">
        <Button
          color="primary"
          id="logoutButton"
          onClick={() => { logout(); cleanup() }}>Logout</Button>
      </div>

    </div>
  )
}