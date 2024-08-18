import React from 'react'
import '../../../style/css/inputs/sortInput/sortInput.css'
import { ICustomSortInput } from '../../../ts/interfaces/inputs/sortInput/ICustomSortInput'
import List from '../lists/List'
import SortOption from '../cards/SortOption'
import { ISortOption } from '../../../ts/interfaces/inputs/sortInput/ISortOption'

const CustomSortInput:React.FC<ICustomSortInput> = ({sortOptions, sortOption, setSortOption}) => {

    const [isSortPanelActive,setSortPanelIsActive] = React.useState<boolean>(false)

    function setSortInputActive() {
        setSortPanelIsActive(!isSortPanelActive)
    }

  return (
    <div className='customSortInput'>
      <button type='button' onClick={setSortInputActive}>
        <h4>Sort by <span className='selectedSortOption'>{sortOption ? sortOption : '..'}</span></h4>
      </button>
      {isSortPanelActive 
        && <List
                containerClassname='sortOptionsContainer'
                items={sortOptions} 
                renderItem={(option:ISortOption) => <SortOption key={option.name} option={option} setSortOption={setSortOption} setSortInputActive={setSortInputActive}/>}/>}
    </div>
  )
}

export default CustomSortInput
