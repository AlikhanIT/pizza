import styles from './Pagination.module.scss'
import ReactPaginate from 'react-paginate';

const Pagination = ({onChangePage, pageCount}) => {
    return(
        <>
            {
                Math.ceil(pageCount / 4) > 1 ? (
                    <ReactPaginate
                        className={styles.root}
                        breakLabel="..."
                        nextLabel=">"
                        previousLabel="<"
                        onPageChange={(event) => onChangePage(event.selected + 1)}
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