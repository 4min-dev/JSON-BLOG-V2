import React from 'react'
import '../../../../style/css/cards/todoCard.css'
import { ITodo } from '../../../../ts/interfaces/todos/ITodo'

type TTodoCard = {
    todo:ITodo,
    completeTodo:(todoId:number) => void
}

const TodoCard:React.FC<TTodoCard> = ({todo,completeTodo}) => {

  return (
    <div className={`todoCard ${todo.completed ? 'completed' : 'noCompleted'}`}>
      <h1>{todo.title}</h1>
      <button type='button' disabled={todo.completed} onClick={() => completeTodo(todo.id)}>
        <img src='/done.png' alt='complete'/>
      </button>
    </div>
  )
}

export default TodoCard
