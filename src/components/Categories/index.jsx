import {useDispatch, useSelector} from "react-redux";
import { setActiveCategory} from "../redux/slices/filterSlice";

function Categories(){
    const activeCategory = useSelector((state) => (state.filterReducer.activeCategory));
    const dispatch = useDispatch();
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

    return(
        <div className='categories'>
            <ul>
                {
                    categories.map((value, index) => (
                        <li key={index} onClick={() => (dispatch(setActiveCategory(index)))} className={activeCategory === index ? 'active' : ''}>{value}</li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Categories