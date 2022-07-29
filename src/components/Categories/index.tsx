import {useDispatch, useSelector} from "react-redux";
import {getFilterData, setActiveCategory} from "../redux/slices/filterSlice";

const Categories = () => {
    const { activeCategory } = useSelector(getFilterData);
    const dispatch = useDispatch();
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

    return(
        <div className='categories'>
            <ul>
                {
                    categories.map((value: string, index: number) => (
                        <li key={index} onClick={() => (dispatch(setActiveCategory(index)))} className={activeCategory === index ? 'active' : ''}>{value}</li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Categories