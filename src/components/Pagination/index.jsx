import ReactPaginate from 'react-paginate'

import styles from './Pagination.module.scss'

export const Pagination = () => {
  return (
    <ReactPaginate
          className={styles.root}
          breakLabel="..."
          nextLabel=">"
          previousLabel="<"
          onPageChange={e => console.log(e)}
          pageRangeDisplayed={8}
          pageCount={3}
          renderOnZeroPageCount={null}
        />
  )
}