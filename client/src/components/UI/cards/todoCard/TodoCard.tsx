import React from 'react'
import '../../../../style/css/cards/todoCard.css'
import { ITodo } from '../../../../ts/interfaces/todos/ITodo'

type TTodoCard = {
    todo:ITodo
}

const TodoCard:React.FC<TTodoCard> = ({todo}) => {
  return (
    <div className={`todoCard ${todo.completed ? 'completed' : 'noCompleted'}`}>
      <h1>{todo.title}</h1>
      <button type='button' disabled={todo.completed}>
        <img src='/done.png' alt='complete'/>
      </button>
    </div>
  )
}

export default TodoCard
