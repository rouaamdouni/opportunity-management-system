import style from './style.css'
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import UserContext from '../../../../contexts/UserContext'
function Sform() {
 
  const [password, setpassword] = useState('');
  const [email, setemail] = useState('');
  const navigate = useNavigate();
  const data = { password: password, email: email };
  const { user, setUser } = useContext(UserContext);
  const HandleClick = () => {
    fetch('http://localhost:3000/signin', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          const MySwal = withReactContent(Swal)
          MySwal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${data.error}`,
          })
          // alert(`Error:${data.error}`)
        }

        else {
          localStorage.setItem("token", data.token);
          navigate("/");
          var token = localStorage.getItem("token");
          var decoded = jwt_decode(token);
          const { username } = decoded;
          setUser(username);
  
        }
      })
      .catch((error) => {
        alert(`Error:${error}`);
      });
  }
  return (
    <div className='body'>
      <div className="login">
        <div className="login__group">
          <input className="login__group__input" type="text" value={email} onChange={(e) => setemail(e.target.value)} required />
          <label className="login__group__label">Email or phone number</label>
        </div>
        <div className="login__group">
          <input className="login__group__input" type="password" value={password} onChange={(e) => setpassword(e.target.value)} required />
          <label className="login__group__label">Password</label>
        </div>
        <button className="login__sign-in" onClick={HandleClick} type="button">Sign In</button>
        <div className="login__secondary-cta">
        <NavLink className="login__secondary-cta__text" to={'/SignUp'}> Register </NavLink>
          <a className="login__secondary-cta__text login__secondary-cta__text--need-help" href="#">Need help?</a></div>
      </div>

    </div>
  )
}

export default Sform