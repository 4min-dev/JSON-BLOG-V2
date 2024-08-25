import React from 'react'
import Header from '../../UI/Header'
import AsidePan from '../../UI/AsidePan'
import CustomSortInput from '../../UI/inputs/CustomSortInput'
import { ISortOption } from '../../../ts/interfaces/inputs/sortInput/ISortOption'
import { todosService } from '../../../redux/services/todosService'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { IFilterQuery } from '../../../ts/interfaces/filterContent/IFilterQuery'
import SpinnerLoader from '../../UI/loaders/SpinnerLoader'
import getTotalPages from '../../../utils/pagination/getTotalPages'
import { todosSortData } from '../../../utils/data/todosSortData'
import TodosList from '../../UI/lists/TodosList'

const TodosPage:React.FC = () => {

    const selector = useTypedSelector(state => state.sessionUserSlice)

    let [filter,setFilter] = React.useState<IFilterQuery>(
        {
            limitQuery:10, 
            searchQuery:'', 
            sortQuery: {
                name:'', 
                sortKey:'', 
                sortValue:null},
            totalContentCount:null,
            currPage:1,
            totalPages:null
        })
    
    const { data, isLoading } = todosService.useGetUserTodosQuery({userId:selector.user.userId, filter})

    function searchQueryHandler(event:React.ChangeEvent<HTMLInputElement>) {
        setFilter((prev) => ({
            ...prev,
            searchQuery:event.target.value
        }))
    }

    function setSortOptionHandler(option:ISortOption) {
        setFilter((prev) => ({
            ...prev,
            sortQuery:option
        }))
    }

    React.useEffect(() => {
        if(data && 'headers' in data) {
            const xTotalCount = Number(data.headers['x-total-count'])

            setFilter((prev) => ({
                ...prev,
                totalContentCount:xTotalCount,
                totalPages:getTotalPages({totalContent:xTotalCount, contentLimit:filter.limitQuery})
            }))
        }
    },[data])

  return (
    <div className='todosPageContainer'>
      {isLoading && <SpinnerLoader positionType='fixed'/>}
      <Header/>
      <AsidePan>
        <CustomSortInput setSortOption={setSortOptionHandler} sortOption={filter.sortQuery.name} sortOptions={todosSortData}/>
      </AsidePan>
      {data && <TodosList todos={data.data} searchQuery={filter.searchQuery} todosSearchInputHandler={searchQueryHandler}/>}
    </div>
  )
}

export default TodosPage
