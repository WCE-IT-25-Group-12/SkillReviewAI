import React, { useState,useEffect } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import buttonimg from '../../assets/google.png';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); 

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const navigate = useNavigate();
  const handleLogin = () => { 
    navigate('/details');
  }

  const loginwithgoogle = ()=>{
    window.open("http://localhost:5000/auth/google/callback","_self")
  }
 
  return (
    <>
      <div className='main'>
        <div className='heading'>
          <div className="nine">
            <h1>An Ai Platform<span>For Mock Interview Experience</span></h1>
          </div>
          <div className="three"><h1>SkillReviews AI</h1></div>
        </div>
        <div className="login-page">
          <div className="form">
            <div className='text'>
              <h1>SkillReview 💻 AI</h1>
              <h2>Welcome to SkillReview AI 👋</h2>
            </div>
            {isLogin ? (
              <form className='login-form'>
                <input type="text" name="" id="" placeholder='username' className='in'/>
                <input type="password" name="" id="" placeholder='password' className='in'/>
                <button className='log' onClick={handleLogin}>Login</button>
                <p className='message'>Not Registered? <a onClick={toggleForm} style={{cursor: "pointer"}}> Create an account</a></p>
              </form>
            ) : (
              <form className='signup-form'>
                <input type="text" name="" id="" placeholder='username' style={{height:"1.5rem"}} />
                <input type="password" name="" id="" placeholder='password' style={{height:"1.5rem"}}/>
                <input type="password" name="" id="" placeholder='confirm password' style={{height:"1.5rem"}}  />
                <button className='sign'>Sign Up</button>
                <p className='message'>Already have an account? <a onClick={toggleForm} style={{cursor: "pointer"}}> Sign in</a></p>
              </form>
            )}
            <div className='google'> 
                <button className='g-sign-in-button' onClick={loginwithgoogle}>
                  <div className="content-wrapper">
                    <div className="logo-wrapper">
                        <img src={buttonimg} alt="" />
                    </div>
                    <span className="text-container">
                        <span>Sign in with Google</span>
                    </span>
                  </div>
                </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Login;