import ReactPaginate from 'react-paginate' 
import { useDispatch } from 'react-redux'

import { changePage } from '../../redux/slices/filterSlice'
import styles from './Pagination.module.scss'

export const Pagination = () => {
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
      renderOnZeroPageCount={null}
    />
  )
}