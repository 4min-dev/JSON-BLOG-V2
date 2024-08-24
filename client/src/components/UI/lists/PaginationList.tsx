import React from 'react'
import '../../../style/css/lists/paginationList/paginationList.css'
import PaginationButton from '../buttons/PaginationButton'

type TPaginationList = {
    paginationArray:number[],
    currPage:number,
    paginationHandler:(page:number) => void
}

const PaginationList:React.FC<TPaginationList> = ({paginationArray,currPage,paginationHandler}) => {

  return (
    <div className='paginationList'>
      {paginationArray.length > 0 
        && paginationArray.map(button => <PaginationButton disabled={button == currPage} button={button} paginationHandler={() => paginationHandler(button)} key={button}/>)}
    </div>
  )
}

export default PaginationList
