import Categories from "../components/Categories";
import Sort, {sortList} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizaBlock from "../components/PizzaBlock";
import {useEffect, useRef } from "react";
import Pagination from "../components/Pagination";
// import {SearchContext} from "../App";
import {useDispatch, useSelector} from "react-redux";
import {getFilterData, setFilters} from "../components/redux/slices/filterSlice";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {fetchPizzas, getPizzaData} from "../components/redux/slices/pizzaSlice";

function Home(){
    const { items, isLoading } = useSelector(getPizzaData)
    const { activeCategory, sortProperties, currentPage, searchBy } = useSelector(getFilterData)
    // const {searchBy} = useContext(SearchContext);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();

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
            navigate(`/${sortProperties.sortProp}/${activeCategory}/${currentPage}`);
        }
        isFirstRequest.current = true;
    }, [activeCategory, sortProperties, searchBy, currentPage, navigate])

    useEffect(() => {
        if(location.pathname !== '/') {
            const sort = sortList.find((obj) => obj.sortProp === params.sortProperty);
            dispatch(setFilters({ ...params, sortProperty: sort}));
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
                {isLoading === 'error' ? (
                    <div className="content__error-info">
                        <h2>Произошла ошибка 😕</h2>
                        <p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
                    </div>
                ) : (
                    <div className='content__items'>
                        <>{isLoading === 'loading' ? skeletons : pizzas}</>
                    </div>
                )}
            </div>
            <Pagination />
        </>
    )
}

export default Home