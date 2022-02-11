import axios from 'axios';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.scss'

const Register = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    const navigate = useNavigate()

    const emailRef = useRef()
    const passwordRef = useRef()
    const usernameRef = useRef()

    const gotologin = () => {
        navigate('/login')
    }

    const handleStart = () => {
        setEmail(emailRef.current.value)
    }

    const handleFinish = async (e) => {
        e.preventDefault()
        setPassword(passwordRef.current.value)
        setUsername(usernameRef.current.value)
        try {
            if(email && username && password)
            {
                await axios.post('auth/register', {email, username, password})
                navigate('/login')
            }
        } catch (err){
            console.log(err)
        }
    }

  return (
    <div className='register'>
        <div className="top">
            <div className="wrapper">
                <img className='logo' src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="" />
                <button className='loginButton' onClick={gotologin}>Sign In</button>
            </div>            
        </div>
        <div className="container">
            <h1>Unlimited movies, TV </h1>
            <h1>shows, and more.</h1>
            <h2>Watch anywhere. Cancel anytime.</h2>
            <p>
            Ready to watch? Enter your email to create or restart your membership.
            </p>

            { !email ? (
                <div className="input">
                <input type="email" placeholder='Email address' ref={emailRef} />
                <button className='registerButton' onClick={handleStart} >Get Started</button>
            </div>
            ) : (
                <form className="input">
                <input type="username" placeholder='username' ref={usernameRef} />
                <input type="password" placeholder='Password' ref={passwordRef} />
                <button className='registerButton' onClick={handleFinish} >Start</button>
            </form>
            )}



            
        </div>
    </div>
  );
};

export default Register;

