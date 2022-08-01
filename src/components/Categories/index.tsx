import {useDispatch} from "react-redux";
import {setActiveCategory} from "../redux/slices/filterSlice";
import React from "react";

export const Categories = React.memo(({value}: {value: number}) => {
    const activeCategory = value;
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
})