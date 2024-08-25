import React from 'react'
import '../../../style/css/lists/todosList/todosList.css'
import { ITodo } from '../../../ts/interfaces/todos/ITodo'
import List from './List'
import TodoCard from '../cards/todoCard/TodoCard'
import CustomInput from '../inputs/CustomInput'

type TTodosList = {
    todos:ITodo[],
    searchQuery:string,
    todosSearchInputHandler:(event:React.ChangeEvent<HTMLInputElement>) => void
}

const TodosList:React.FC<TTodosList> = ({todos, searchQuery, todosSearchInputHandler}) => {
  return (
    <div className='todosListContainer'>
    <CustomInput globalId='todosSearchInput' value={searchQuery} type='text' onChange={todosSearchInputHandler} placeholder='Search..' />
    {todos.length > 0 ? <List items={todos} renderItem={(todo) => <TodoCard todo={todo}/>}/> : <h1>No todos found</h1>}
    </div>
  )
}

export default TodosList
