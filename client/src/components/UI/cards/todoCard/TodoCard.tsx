import React from 'react'
import '../../../../style/css/cards/todoCard.css'
import { ITodo } from '../../../../ts/interfaces/todos/ITodo'

type TTodoCard = {
    todo:ITodo,
    completeTodo:(todoId:number) => void,
    deleteTodo:(todoId:number) => void
}

const TodoCard:React.FC<TTodoCard> = ({todo,completeTodo,deleteTodo}) => {

  return (
    <div className={`todoCard ${todo.completed ? 'completed' : 'noCompleted'}`}>
      <h1>{todo.title}</h1>
      <div className="todoCardInteractiveContainer">
        <button type='button' disabled={todo.completed} onClick={() => completeTodo(todo.id)}>
          <img src='/done.png' alt='complete'/>
        </button>
        <button type='button' disabled={todo.completed} onClick={() => deleteTodo(todo.id)}>
          <img src='/delete.png' alt='delete_todo'/>
        </button>
      </div>
    </div>
  )
}

export default TodoCard
