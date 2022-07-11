import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizaBlock from "../components/PizzaBlock";
import {useEffect, useState} from "react";

function Home(){
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('https://62cc4d0ca080052930a9357f.mockapi.io/items').then((response) => {
            return response.json();
        }).then((json) => {
            setItems(json);
            setIsLoading(!isLoading)
        })
    }, [])
    return(
        <>
            <div className='content__top'>
                <Categories />
                <Sort />
            </div>
            <h2 className='content__title'>Все пиццы</h2>
            <div className='content__items'>
                {
                    isLoading
                        ? [...new Array(6)].map((value, index) => (<Skeleton key={index} />))
                        : items.map((obj) => (<PizaBlock key={obj.id} {...obj} />
                        ))
                }
            </div>
        </>
    )
}

export default Home