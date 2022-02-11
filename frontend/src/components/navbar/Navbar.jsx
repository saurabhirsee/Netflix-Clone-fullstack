import './navbar.scss';
import { ArrowDropDown, Notifications, Search } from '@material-ui/icons'
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../authContext/AuthContext';
import { logout } from '../../authContext/AuthActions';

function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    const {dispatch} = useContext(AuthContext)

    const username = JSON.parse(localStorage.getItem('user')).username

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    }
    return (
        <div className={isScrolled ? 'navbar scrolled' : 'navbar'}>
           <div className="container">
            <div className="left">
                <Link to='/' className='link'>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="" />
                </Link>

                    <Link to='/' className='link'>
                        <span>Homepage</span>
                    </Link>
                    <Link to='/series' className='link'>
                        <span className='navbarmainLinks' >Series</span>
                    </Link>
                    <Link to='/movies' className='link'>
                        <span className='navbarmainLinks' >Movies</span>
                    </Link>
                    <span>New and Popular</span>
                    <span>My List</span>
                </div>
                <div className="right">
                    <Search className='icon'/>
                    <span className='hd'>{username}</span>
                    <Notifications className='icon hd'/>
                    <img src="https://i.pinimg.com/564x/e1/73/15/e173159562c8b0328c5086a9772c2737.jpg" alt="" />
                    <div className="profile">
                        <ArrowDropDown className='icon'/>
                        <div className="options">
                            <span>Settings</span>
                            <span onClick={() => dispatch(logout())}>Logout</span>
                        </div>
                    </div>
                    
                </div>
           </div>
        </div>
    )
}

export default Navbar
