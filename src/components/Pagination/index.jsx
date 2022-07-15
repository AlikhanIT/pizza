import styles from './Pagination.module.scss'
import ReactPaginate from 'react-paginate';
import {useDispatch, useSelector} from "react-redux";
import {setCurrentPage} from "../redux/slices/filterSlice";

const Pagination = () => {
    const { currentPage } = useSelector(state => state.filterReducer)
    const pageCount = useSelector(state => state.filterReducer.pageCount)
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
                        onPageChange={(event) => dispatch(setCurrentPage(event.selected + 1))}
                        pageRangeDisplayed={4}
                        pageCount={Math.ceil(pageCount / 4)}
                        renderOnZeroPageCount={null}
                    />
                ) : ''
            }
        </>
    )
}

export default Pagination