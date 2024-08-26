import React from 'react'
import '../../../style/css/lists/todosList/todosList.css'
import { ITodo } from '../../../ts/interfaces/todos/ITodo'
import List from './List'
import TodoCard from '../cards/todoCard/TodoCard'
import CustomInput from '../inputs/CustomInput'
import { IFilterQuery } from '../../../ts/interfaces/filterContent/IFilterQuery'
import PaginationList from './PaginationList'
import { usePagination } from '../../../hooks/usePagination'
import { todosService } from '../../../redux/services/todosService'
import SpinnerLoader from '../loaders/SpinnerLoader'
import useNotificationMessage from '../../../hooks/useNotificationMessage'
import { useDispatch } from 'react-redux'

type TTodosList = {
    todos:ITodo[],
    filter:IFilterQuery,
    paginationHandler:(page:number) => void,
    todosSearchInputHandler:(event:React.ChangeEvent<HTMLInputElement>) => void
}

const TodosList:React.FC<TTodosList> = ({todos, filter, paginationHandler, todosSearchInputHandler}) => {

  const dispatch = useDispatch()
  const [completeTodo, { data, isLoading, isSuccess, error }] = todosService.useCompleteTodoMutation()

  async function completeTodoHandler(todoId:number) {
    await completeTodo(todoId)
  }

  const paginationArray = usePagination({totalPages:filter.totalPages!,currPage:filter.currPage!})

  React.useEffect(() => {
    const successMessage = `${data?.title} was completed`
    useNotificationMessage({dispatch, isSuccess, successMessage, error})
  },[isSuccess, error])

  return (
    <div className='todosListContainer'>
      {isLoading && <SpinnerLoader positionType='fixed'/>}
      <CustomInput globalId='todosSearchInput' type='text' onChange={todosSearchInputHandler} placeholder='Search..' />
      {todos.length > 0 
        ? 
        <>
          <List items={todos} renderItem={(todo) => 
              <TodoCard key={todo.id} todo={todo} completeTodo={completeTodoHandler}/>}/>
          {!filter.searchQuery 
            && <PaginationList currPage={filter.currPage!} paginationArray={paginationArray} paginationHandler={paginationHandler}/>}
        </> : <h1>No todos found</h1>}
    </div>
  )
}

export default TodosList
