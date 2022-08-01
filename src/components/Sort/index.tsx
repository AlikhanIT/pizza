import React, {useEffect, useRef, useState} from "react";
import {setSortProperty, setSortMath, TypeOfSort} from "../redux/slices/filterSlice";
import {useDispatch} from "react-redux";

export const sortList: TypeOfSort[] = [{
    sortName: 'популяронсти',
    activeProp: 0,
    sortProp: 'rating',
    sortMath: true
},{
    sortName: 'цене',
    activeProp: 1,
    sortProp: 'price',
    sortMath: true
},{
    sortName: 'алфавиту',
    activeProp: 2,
    sortProp: 'title',
    sortMath: true
}]

export const Sort = React.memo(({ sorts }: {sorts: TypeOfSort}) => {
    const sortProps = sorts;
    const dispatch = useDispatch();
    const [open, setOpen] = useState<boolean>(false);
    const sortRef = useRef<HTMLDivElement>(null);
    let sortName = sortList[sortProps.activeProp].sortName;

    const onClickSortName = (val: TypeOfSort) => {
        dispatch(setSortProperty(val));
        setOpen(!open);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const _event = event as MouseEvent & {
                path: Node[]
            }
            if(sortRef.current && !_event.path.includes(sortRef.current)){
                setOpen(false)
            }
        }
        document.body.addEventListener('click', handleClickOutside);
        return () => {
            document.body.removeEventListener('click', handleClickOutside)
        }
    }, [])

    return(
        <div ref={sortRef} className='sort'>
            <div className='sort__label'>
                <svg onClick={() => (dispatch(setSortMath()))}
                    width='10'
                    height='6'
                    viewBox='0 0 10 6'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
                        fill='#2C2C2C'
                    />
                </svg>
                <b>Сортировка по:</b>
                <span onClick={() => setOpen(!open)}>{sortName}</span>
            </div>
            {
                open && (<div className='sort__popup'>
                    <ul>
                        {sortList.map((value, index) =>(
                            <li key={index} onClick={() => (onClickSortName(value)) } className={+sortProps.activeProp === index ? 'active' : ''}>{value.sortName}</li>
                        ))}
                    </ul>
                </div>)
            }
        </div>
    )
})