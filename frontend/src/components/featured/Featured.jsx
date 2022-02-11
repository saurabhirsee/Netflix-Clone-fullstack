import { InfoOutlined, PlayArrow } from '@material-ui/icons';
import { useEffect } from 'react';
import { useState } from 'react';
import './featured.scss';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

function Featured({type, setGenre}) {
    const [content, setContent] = useState({})
    const [genreq, setGenreq] = useState('')

    useEffect(()=>{
        const getRandomContent = async ()=>{
            try{
                const req = genreq ? `movies/random?type=${type}&genre=${genreq}` : `movies/random?type=${type}`
                const res = await axios.get(req, {
                    headers:
                    {
                        token: 'Bearer ' + JSON.parse(localStorage.getItem("user")).accessToken
                    }
                })
                setContent(res.data[0])

            } catch (err) {
                console.log(err)
            }
        }
        getRandomContent()
    },[type,genreq])

    return (
        <div className='featured'>
            {type && (
                <div className='category'>
                    <span>{type === 'movie' ? "Movies" : "Series"}</span>
                    <select name = 'genre' id='genre' onChange={e => {setGenre(e.target.value); setGenreq(e.target.value)}} >
                        <option value=''>Select Genre</option>
                        <option value="action">Action</option>
                        <option value="animation">Animation</option>
                        <option value="comedy">Comedy</option>
                        <option value="crime">Crime</option>
                        <option value="drama">Drama</option>
                        <option value="fantasy">Fantasy</option>
                        <option value="horror">Horror</option>
                        <option value="romance">Romance</option>
                        <option value="sci-fi">Sci-fi</option>
                        <option value="thriller">Thriller</option>

                    </select>
                </div>
            )}

            <div className='imgshade1'>
            </div>
            <div className='imgshade2'>
            </div>
            <img className='img2' src={content.img} alt="" />
           
            <div className="info">
                <img src={content.imgTitle} alt="" />
                <span className='desc'>
                    {content.desc}
                </span>
                <div className='buttons'>
                    <NavLink style={{ textDecoration: 'none' , color:'black' }} to='/watch' state={{ movie: content }} >
                    <button className="play">
                        <PlayArrow/>
                        <span>Play</span>
                    </button>
                    </NavLink>
                    <button className="more">
                        <InfoOutlined/>
                        <span>Info</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Featured;
