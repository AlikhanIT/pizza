import { Categories, Sort, Skeleton, PizzaBlock, Pagination, sortList } from '../components/index'
import {useEffect, useRef } from "react";
import {useSelector} from "react-redux";
import {getFilterData, setFilters, TypeOfNavigate} from "../components/redux/slices/filterSlice";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {fetchPizzas, getPizzaData} from "../components/redux/slices/pizzaSlice";
import {RootState, useAppDispatch} from "../components/redux/store";

type Item = {
    title: string,
    id: string,
    imageUrl: string,
    types: number[],
    sizes: number[],
    price: number,
    category: number,
    rating: number,
}

const Home: React.FC = () => {
    const { items, isLoading } = useSelector(getPizzaData)
    const { activeCategory, sortProperties, currentPage, searchBy } = useSelector(getFilterData)

    const dispatch = useAppDispatch();
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
            if(sort){
                const _params = { ...params, sortProperty: sort};
                dispatch(setFilters(_params as TypeOfNavigate));
            }
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

    const skeletons = [...new Array(4)].map((_, index: number) => (<Skeleton key={index} />));
    const pizzas = items.map((obj: Item) => (<PizzaBlock key={obj.id} {...obj} />));

    return(
        <>
            <div className="container">
                <div className='content__top'>
                    <Categories value={activeCategory} />
                    <Sort sorts={useSelector((state: RootState) => state.filterReducer.sortProperties)} />
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