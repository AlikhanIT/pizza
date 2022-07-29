import styles from './Pagination.module.scss'
import ReactPaginate from 'react-paginate';
import {useDispatch, useSelector} from "react-redux";
import {setCurrentPage} from "../redux/slices/filterSlice";
import {getPizzaData} from "../redux/slices/pizzaSlice";
import React from "react";

const Pagination: React.FC = () => {
    // @ts-ignore
    const { currentPage } = useSelector(state => state.filterReducer)
    const { pageCount } = useSelector(getPizzaData)
    const dispatch = useDispatch();

    return(
        <>
            {
                Math.ceil(pageCount / 4) > 1 ? (
                    <ReactPaginate
                        className={styles.root}
                        breakLabel="..."
                        nextLabel=">"
                        previousLabel="<"
                        onPageChange={(event) => dispatch(setCurrentPage(currentPage + 1))}
                        pageRangeDisplayed={4}
                        pageCount={Math.ceil(pageCount / 4)}
                    />
                ) : ''
            }
        </>
    )
}

export default Pagination