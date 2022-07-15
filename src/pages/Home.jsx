import Categories from "../components/Categories";
import Sort, {sortList} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizaBlock from "../components/PizzaBlock";
import {useContext, useEffect, useRef, useState} from "react";
import Pagination from "../components/Pagination";
import {SearchContext} from "../App";
import {useDispatch, useSelector} from "react-redux";
import { setPageCount, setFilters } from "../components/redux/slices/filterSlice";
import { useNavigate } from "react-router-dom";
import qs from 'qs'
import axios from "axios";

function Home(){
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { activeCategory, sortProperties, currentPage } = useSelector(state => state.filterReducer)
    const {searchBy} = useContext(SearchContext);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isFirstRequest = useRef(false);
    const isSearch = useRef(false);

    const fetchPizzas = () => {
        setIsLoading(true)
        axios.get(`https://62cc4d0ca080052930a9357f.mockapi.io/items?${activeCategory > 0 ? `category=${activeCategory}` : ''}&${searchBy !== undefined ? `title=${searchBy}` : ''}&sortBy=${sortProperties.sortProp}&order=${sortProperties.sortMath === true ? 'desc' : 'asc'}&page=${currentPage}&limit=4`).then((res) => {
            setItems(res.data);
            setIsLoading(false);
        });
        axios.get(`https://62cc4d0ca080052930a9357f.mockapi.io/items?${activeCategory > 0 ? `category=${activeCategory}` : ''}&${searchBy !== undefined ? `title=${searchBy}` : ''}&sortBy=${sortProperties.sortProp}&order=${sortProperties.sortMath === true ? 'desc' : 'asc'}`).then((res) => {
            dispatch(setPageCount(res.data.length));
        });
    };

    useEffect(() => {
        if(isFirstRequest.current) {
            const queryString = qs.stringify({
                sortProperties: sortProperties.sortProp,
                activeCategory,
                currentPage
            });
            navigate(`?${queryString}`);
        }
        isFirstRequest.current = true;
    }, [activeCategory, sortProperties, searchBy, currentPage])

    useEffect(() => {
        if(window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sort = sortList.find((obj) => obj.sortProp === params.sortProperties);
            dispatch(setFilters({ ...params, sortProperties: sort}));
            isSearch.current = true;
        }
    }, [])

    useEffect(() => {
        if(!isSearch.current){
            fetchPizzas();
        }
        isSearch.current = false
        window.scrollTo(0, 0);
    }, [activeCategory, sortProperties, searchBy, currentPage])

    const skeletons = [...new Array(6)].map((value, index) => (<Skeleton key={index} />));
    const pizzas = items.map((obj) => (<PizaBlock key={obj.id} {...obj} />));

    return(
        <>
            <div className="container">
                <div className='content__top'>
                    <Categories />
                    <Sort />
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
            <Pagination />
        </>
    )
}

export default Home