import { Add, PlayArrow, ThumbDownAltOutlined, ThumbUpAltOutlined } from '@material-ui/icons';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './listItem.scss'

function ListItem({index, item}) {

    const [isHovered, setIsHovered] = useState(false)
    const [movie, setMovie] = useState({})

    const trailersrc = 'https://www.youtube.com/embed/' + movie.trailer + '?autoplay=true&mute=1&controls=0'

    useEffect( () =>{
      const getMovie = async () => {
        try {
          const res = await axios.get('movies/find/'+item, {
            headers:
            {
                token: 'Bearer ' + JSON.parse(localStorage.getItem("user")).accessToken
            }
        })
        setMovie(res.data)
        } catch (err) {
          console.log(err)
        }
      }
      getMovie()
    },[item])

    return (
      <NavLink style={{ textDecoration: 'none' , color:'white' }} to='/watch' state={{ movie: movie }} >
        <div className='item'>
      <div className='listItem' 
        style={{left: isHovered && index*225 - 50 + index*2.5}}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >
          <img src={movie.imgSmall} alt="" />

          {isHovered && 
          (<>
            <iframe src={trailersrc} >
            </iframe>
            {/* <video src={movie.trailer} autoPlay={true} loop ></video> */}

            <div className="itemInfo">
                <div className="icons">
                    <PlayArrow className='icon'/>
                    <Add className='icon'/>
                    <ThumbUpAltOutlined className='icon'/>
                    <ThumbDownAltOutlined className='icon'/>
                </div>
                <div className="itemInfoTop">
                    <span>{movie.duration}</span>
                    <span className="limit">{movie.limit}+</span>
                    <span>{movie.year}</span>
                </div>
                <div className="desc">
                    {movie.desc}
                </div>
                <div className="genre">{movie.genre}</div>
            </div>          
          </>         
          )}

      </div>
      <span className='titlename'>{movie.title}</span>
          </div>
      </NavLink>
      
    );
  }

export default ListItem;
