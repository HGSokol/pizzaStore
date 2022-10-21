import ReactPaginate from 'react-paginate' 
import { useDispatch, useSelector } from 'react-redux'

import { changePage } from '../../redux/slices/filterSlice'
import styles from './Pagination.module.scss'

export const Pagination = () => {
  const currentPage = useSelector(state => state.filterReducer.currentPage)
  const dispatch = useDispatch()

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={i => dispatch(changePage(i.selected+1))}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage-1}
      renderOnZeroPageCount={null}
    />
  )
}