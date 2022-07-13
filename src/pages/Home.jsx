import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizaBlock from "../components/PizzaBlock";
import {useContext, useEffect, useState} from "react";
import Pagination from "../components/Pagination";
import {SearchContext} from "../App";

function Home(){
    const [activeCategory, setActiveCategory] = useState(0);
    const [items, setItems] = useState([]);
    const [sortProperties, setSortProperties] = useState({
        activeProp: 0,
        sortProp: 'rating',
        sortMath: true
    });
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(3);
    const {searchBy} = useContext(SearchContext);

    const onChangeCategory = (i) => {
        setActiveCategory(i);
    }

    const onChangeSort = (i) => {
        setSortProperties(i);
    }

    const onChangeSortMath = () => {
        setSortProperties({...sortProperties, sortMath: !sortProperties.sortMath});
    }

    useEffect(() => {
        setIsLoading(true)
        fetch(`https://62cc4d0ca080052930a9357f.mockapi.io/items?${activeCategory > 0 ? `category=${activeCategory}` : ''}&${searchBy !== undefined ? `title=${searchBy}` : ''}&sortBy=${sortProperties.sortProp}&order=${sortProperties.sortMath === true ? 'desc' : 'asc'}&p=${currentPage}&l=4`).then((response) => {
            return response.json();
        }).then((json) => {
            setItems(json);
            setIsLoading(false);
        });
        fetch(`https://62cc4d0ca080052930a9357f.mockapi.io/items?${activeCategory > 0 ? `category=${activeCategory}` : ''}&${searchBy !== undefined ? `title=${searchBy}` : ''}&sortBy=${sortProperties.sortProp}&order=${sortProperties.sortMath === true ? 'desc' : 'asc'}`).then((response) => {
            return response.json();
        }).then((json) => {
            setPageCount(json.length);
        });
        window.scrollTo(0, 0);
    }, [activeCategory, sortProperties, searchBy, currentPage])

    const skeletons = [...new Array(6)].map((value, index) => (<Skeleton key={index} />));
    const pizzas = items.map((obj) => (<PizaBlock key={obj.id} {...obj} />));

    return(
        <>
            <div className="container">
                <div className='content__top'>
                    <Categories categoryIndex={activeCategory} onChangeCategory={onChangeCategory}/>
                    <Sort sortProps={sortProperties} onChangeSort={(i) => onChangeSort(i)} onChangeSortMath={() => onChangeSortMath()}/>
                </div>
                <h2 className='content__title'>Все пиццы</h2>
                <div className='content__items'>
                    {
                        isLoading
                            ? skeletons
                            : pizzas
                    }
                </div>
            </div>
            <Pagination onChangePage={(setCurrentPage)} pageCount={pageCount} />
        </>
    )
}

export default Home