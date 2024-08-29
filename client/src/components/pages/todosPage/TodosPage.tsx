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
import useDebounceSearch from '../../../hooks/useDebounceSearch'
import Footer from '../../UI/Footer'
import NewTodoPan from './UI/NewTodoPan'
import Notifications from '../../UI/popup/Notifications'
import { ITodo } from '../../../ts/interfaces/todos/ITodo'
import useNotificationMessage from '../../../hooks/useNotificationMessage'
import { useDispatch } from 'react-redux'

const TodosPage:React.FC = () => {

    const dispatch = useDispatch()
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
    const [addMewTodo, {data:newTodoData, isLoading:isNewTodoLoading, isSuccess:isNewTodoSuccess, error:newTodoError}] = todosService.useNewTodoMutation()
    let [newTodoTitle,setNewTodoTitle] = React.useState('')

    async function sendNewTodoHandler() {

        const newTodo:ITodo = {
            completed:false,
            id:Date.now(),
            title:newTodoTitle,
            userId:selector.user.userId
        }

        await addMewTodo(newTodo)
    }

    const searchQueryHandler = useDebounceSearch({setFilter})

    function newTodoTitleHandler(event:React.ChangeEvent<HTMLTextAreaElement>) {
        setNewTodoTitle(event.target.value)
    }

    function setSortOptionHandler(option:ISortOption) {
        setFilter((prev) => ({
            ...prev,
            sortQuery:option
        }))
    }

    function paginationHandler(page:number) {
        setFilter((prev) => ({
            ...prev,
            currPage:page
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
    },[data ])

    React.useEffect(() => {

        const successMessage = `${newTodoData?.title} has created at ${new Date()}.`
        useNotificationMessage({dispatch, isSuccess:isNewTodoSuccess, error:newTodoError, successMessage})

        if(isNewTodoSuccess) {
            setNewTodoTitle('')
        }

    },[isNewTodoSuccess, newTodoError])

  return (
    <div className='todosPageContainer'>
      {isNewTodoLoading && <SpinnerLoader positionType='fixed'/>}
      <Header/>
      <AsidePan>
        <CustomSortInput setSortOption={setSortOptionHandler} sortOption={filter.sortQuery.name} sortOptions={todosSortData}/>
      </AsidePan>
      {isLoading
        ? <SpinnerLoader positionType='fixed'/> 
        : data && <TodosList todos={data.data} filter={filter} setFilter={setFilter} paginationHandler={paginationHandler} todosSearchInputHandler={searchQueryHandler}/>}
      <NewTodoPan newTodoTitle={newTodoTitle} newTodoTitleHandler={newTodoTitleHandler} sendNewTodoHandler={sendNewTodoHandler}/>
      <Footer/>
      <Notifications/>
    </div>
  )
}

export default TodosPage
