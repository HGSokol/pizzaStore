import ReactPaginate from 'react-paginate'
import { useContext } from 'react'
import { sortContext } from '../../pages/Home' 
import styles from './Pagination.module.scss'

export const Pagination = () => {
  const {setCurrentPage} = useContext(sortContext)
  
  const selectedPage = (i) => {
    setCurrentPage(i+1)
  }

  return (
    <ReactPaginate
          className={styles.root}
          breakLabel="..."
          nextLabel=">"
          previousLabel="<"
          onPageChange={i => selectedPage(i.selected)}
          pageRangeDisplayed={4}
          pageCount={3}
          renderOnZeroPageCount={null}
        />
  )
}