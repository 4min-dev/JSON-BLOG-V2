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
    setFilter:React.Dispatch<React.SetStateAction<IFilterQuery>>,
    paginationHandler:(page:number) => void,
    todosSearchInputHandler:(event:React.ChangeEvent<HTMLInputElement>) => void
}

const TodosList:React.FC<TTodosList> = ({todos, filter, setFilter, paginationHandler, todosSearchInputHandler}) => {

  const dispatch = useDispatch()

  const [completeTodo, { 
                        data:completedTodoData, 
                        isLoading:isTodoCompletion, 
                        isSuccess:isTodoCompleted, 
                        error:completedTodoError }] = todosService.useCompleteTodoMutation()
  const [deleteTodo, {
                      data:deletedTodoData, 
                      isLoading:isTodoDeletion,
                      isSuccess:isTodoDeleted, 
                      error:deletionTodoError}] = todosService.useDeleteTodoMutation()

  async function completeTodoHandler(todoId:number) {
    await completeTodo(todoId)
  }

  async function deleteTodoHandler(todoId:number) {
    await deleteTodo(todoId)

    if(todos.length <= 1) {
      setFilter((prev) => ({
        ...prev,
        currPage:prev.currPage! - 1
      }))
    }
  }

  const paginationArray = usePagination({totalPages:filter.totalPages!,currPage:filter.currPage!})

  React.useEffect(() => {
    const successMessage = `${completedTodoData?.title} was completed`
    useNotificationMessage({dispatch, isSuccess:isTodoCompleted, successMessage, error:completedTodoError})
  },[isTodoCompleted, completedTodoError])

  React.useEffect(() => {
    const successMessage = `${deletedTodoData?.title} was completed`
    useNotificationMessage({dispatch, isSuccess:isTodoDeleted, successMessage, error:deletionTodoError})
  },[isTodoDeleted, deletionTodoError])

  return (
    <div className='todosListContainer'>
      {(isTodoCompletion || isTodoDeletion) && <SpinnerLoader positionType='fixed'/>}
      <CustomInput globalId='todosSearchInput' type='text' onChange={todosSearchInputHandler} placeholder='Search..' />
      {todos.length > 0 
        ? 
        <>
          <List items={todos} renderItem={(todo) => 
              <TodoCard key={todo.id} todo={todo} completeTodo={completeTodoHandler} deleteTodo={deleteTodoHandler}/>}/>
          {!filter.searchQuery 
            && <PaginationList currPage={filter.currPage!} paginationArray={paginationArray} paginationHandler={paginationHandler}/>}
        </> : <h1>No todos found</h1>}
    </div>
  )
}

export default TodosList
