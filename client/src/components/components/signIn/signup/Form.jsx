import React from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';


export default function Form() {
    const [username,setusername]=useState('')
    const [password,setpassword]=useState('')
    const [email,setemail]=useState('');
    const navigate = useNavigate();
    const data={username:username,password:password,email:email}
    const HandleClick =()=>{
        fetch('http://localhost:4000/SignUp', {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((data) => {
              if(data.error) {
                const MySwal = withReactContent(Swal)
                MySwal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: `${data.error}`,
                })
              }else {
                Swal.fire(
                  'Good job!',
                  'you have successfully registered!',
                  'success'
                )
                setTimeout(()=> {
                  navigate("/");
                },1000);
                
              }
            })
            .catch((error) => {
             console.log(error);
            });
    }

  return (
    <div>
      <div className='body'>
      <div className="login">
        <h1 className="login__title">Sign Up</h1>
        <div className="login__group">
          <input className="login__group__input" type="text" value={username} onChange={(e)=>setusername(e.target.value)} required />
          <label className="login__group__label">Username</label>
        </div>
        <div className="login__group">
          <input className="login__group__input" type="e-mail"value={email} onChange={(e)=>setemail(e.target.value)} required />
          <label className="login__group__label">Email or phone number</label>
        </div>
        <div className="login__group">
          <input className="login__group__input" type="password" value={password} onChange={(e)=>setpassword(e.target.value)} />
          <label className="login__group__label">Password</label>
        </div>
        <button className="login__sign-in"  onClick={HandleClick}> SIGN UP</button>
        
        <div className="login__secondary-cta">
        <NavLink className="login__secondary-cta__text" to={'/'}> Sign In </NavLink>
        <a className="login__secondary-cta__text login__secondary-cta__text--need-help" href="#">Need help?</a></div>
      </div>

    </div>
        
    </div>
  )
}

