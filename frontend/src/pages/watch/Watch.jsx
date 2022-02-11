import { ArrowBackOutlined } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import './watch.scss'

function Watch() {
  const location = useLocation()
  const { state } = location
  const movie = state.movie
  const source = "https://www.youtube.com/embed/" + movie.video + "?autoplay=true"
  return (
    <div className='watch'>
      <Link to='/'>
        <div className="back">
            <ArrowBackOutlined/>
            Home
        </div>
      </Link>
        {/* <video className='video' autoPlay progress controls src={movie.video}></video> */}
        <div class='shade'></div>
        <iframe src={source} allow="autoplay;fullscreen" >
        </iframe>
    </div>
  )
}

export default Watch;
