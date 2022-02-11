import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@material-ui/icons';
import { useRef, useState } from 'react';
import ListItem from '../listitem/ListItem';
import './list.scss'

function shuffleList(list)
{
    return list.sort( () => Math.random()-0.5 )
}

function List({list}) {
    
    const [slideNumber, setSlideNumber] = useState(0)
    const [clickLimit, setClickLimit] = useState(window.innerWidth /230)

    const [order, setOrder] = useState(true)

    const handleOrder = () => {
        if(order){
            list.content = shuffleList(list.content)
            setOrder(false)
        }
    }

    const listRef = useRef()
    
    const handleClick = (direction) => {
        let distance = listRef.current.getBoundingClientRect().x - 50
        if(direction === 'left' && slideNumber>0){
            setSlideNumber(slideNumber-1)
            listRef.current.style.transform = `translateX(${230 + distance}px)`
        }
        if(direction === 'right' && slideNumber<10 - clickLimit){
            setSlideNumber(slideNumber+1)
            listRef.current.style.transform = `translateX(${-230 + distance}px)`
        }
    }

    return (
        <div className='list'>
            <span className='listTitle'>{list.title}</span>
            <div className='wrapper'>
                <ArrowBackIosOutlined className='sliderArrow left' onClick={()=> handleClick('left')} style={{display: !slideNumber && 'none' }} />
                {handleOrder()}

                <div className="container" ref={listRef}>
                    {list.content.map( (item,i) => (
                        <ListItem index={i} item={item}/>
                    ))}
                </div>
                
                <ArrowForwardIosOutlined className='sliderArrow right' onClick={()=>handleClick('right')} style={{display: slideNumber>=10-clickLimit && 'none' }} />
            </div>
        </div>
    );
}

export default List;
