import React from 'react'
import '../../../style/css/inputs/sortInput/sortOption.css'
import { ISortOption } from '../../../ts/interfaces/inputs/sortInput/ISortOption'

type TSortOption = {
    option:ISortOption,
    setSortOption:(option:ISortOption) => void,
    setSortInputActive:() => void
}

const SortOption:React.FC<TSortOption> = ({option,setSortOption,setSortInputActive}) => {
    
  return (
    <button disabled={option.sortKey === ''} className='sortOption' onClick={() => {
        setSortOption(option)
        setSortInputActive()
        }}>
      <h4>{option.name}</h4>
    </button>
  )
}

export default SortOption
