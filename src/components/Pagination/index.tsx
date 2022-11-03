import React from 'react'
import ReactPaginate from 'react-paginate' 
import { useSelector } from 'react-redux'

import { selectFilter } from '../../redux/slices/filter/selectors'
import { changePage } from '../../redux/slices/filter/slice'
import { useAppDispatch } from '../../redux/store'
import styles from './Pagination.module.scss'

export const Pagination = () => {
  const { currentPage } = useSelector(selectFilter)
  const dispatch = useAppDispatch()

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
    />
  )
}