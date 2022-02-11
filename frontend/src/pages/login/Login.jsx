import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../authContext/apiCalls';
import { AuthContext } from '../../authContext/AuthContext';
import './login.scss'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const gotoregister = () => {
        navigate('/register')
    }

    const {dispatch} = useContext(AuthContext)

    const handleLogin = (e) => {
        e.preventDefault()
        login({email,password}, dispatch)
    }

  return (
    <div className='login'>
        <div className="top">
            <div className="wrapper">
                <img className='logo' src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="" />

            </div>            
        </div>
        <div className="container">
            <form>
                <h1>Sign In</h1>
                <input type="email" placeholder='Email or Phone Number' onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                <button className='loginButton' onClick={handleLogin} >Sign In</button>
                <span>New to Netflix?<b onClick={gotoregister}>Sign Up now.</b></span>
                <small>
                    This page is protected by Google reCAPTCHA to ensure you're not a
                    bot. <b>Learn more</b>.
                </small>
            </form>            
            
        </div>
    </div>
  );
};

export default Login;

