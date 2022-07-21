import Categories from "../components/Categories";
import Sort, {sortList} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizaBlock from "../components/PizzaBlock";
import {useContext, useEffect, useRef } from "react";
import Pagination from "../components/Pagination";
import {SearchContext} from "../App";
import {useDispatch, useSelector} from "react-redux";
import { setFilters } from "../components/redux/slices/filterSlice";
import { useNavigate } from "react-router-dom";
import { fetchPizzas } from "../components/redux/slices/pizzaSlice";
import qs from 'qs'

function Home(){
    const { items, isLoading } = useSelector(state => state.pizzaReducer)
    const { activeCategory, sortProperties, currentPage } = useSelector(state => state.filterReducer)
    const {searchBy} = useContext(SearchContext);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isFirstRequest = useRef(false);
    const isSearch = useRef(false);

    const getPizzas = () => {
        dispatch(
            fetchPizzas({ activeCategory, searchBy, sortProperties, currentPage })
        )
        window.scrollTo(0, 0);
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
    }, [])

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
            getPizzas();
        }
        isSearch.current = false
        window.scrollTo(0, 0);
    }, [activeCategory, sortProperties, searchBy, currentPage])

    const skeletons = [...new Array(4)].map((value, index) => (<Skeleton key={index} />));
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
                    {isLoading === 'error' ? (
                        <div className="content__error-info">
                            <h2>Произошла ошибка 😕</h2>
                            <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
                        </div>
                    ) : (
                        <>{isLoading === 'loading' ? skeletons : pizzas}</>
                    )}
                </div>
            </div>
            <Pagination />
        </>
    )
}

export default Home