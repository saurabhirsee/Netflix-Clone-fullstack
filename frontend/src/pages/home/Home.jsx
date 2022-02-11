import './home.scss'
import Navbar from '../../components/navbar/Navbar';
import Featured from '../../components/featured/Featured'
import List from '../../components/list/List'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Home = ({type}) => {

    const [lists, setLists] = useState([])
    const [genre, setGenre] = useState(null)

    useEffect( () => {
        console.log(type, genre)
        const getRandomLists = async () => {
            try{
                console.log(`lists${type ? '?type='+type : ''}${genre ? '&?genre='+genre : ''}`)
                const res = await axios.get(`lists${type ? '?type='+type : ''}${genre ? '&genre='+genre : ''}`, {
                    headers:
                    {
                        token: 'Bearer '+JSON.parse(localStorage.getItem("user")).accessToken
                    }
                })
                setLists(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getRandomLists()
    },[type, genre])

    return (
        <div className='home'>
            <Navbar/>
            <Featured type={type} setGenre={setGenre}/>
            {lists.map(list => (
                <List list={list} />
            ))}
            <br />
            <br />
            <br />
            <div className="copyright">
                Copyright © 2022    Saurabh Kumar
                <br/>
                github.com/saurabhirsee
            </div> 
        </div>
    )
}

export default Home;

