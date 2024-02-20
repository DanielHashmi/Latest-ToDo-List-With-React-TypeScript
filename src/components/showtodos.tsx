
import { Todo, useTodos } from '../store/todos';
import { useSearchParams } from 'react-router-dom';

const ShowTodos = () => {
    const { todos, toggleToDoAsCompleted, handleDeleteTodo } = useTodos()
    const [searchParams] = useSearchParams();
    let searchData = searchParams.get("todos")

    let filterData = todos;

    if (searchData === "active") {
        filterData = filterData.filter((task) => !task.completed)
    }
    if (searchData === "completed") {
        filterData = filterData.filter((task) => task.completed)
    }
    return (
        <ul>
            {
                filterData.map((todo: Todo) => {
                    return <li key={todo.id}>
                        <input type="checkbox" id={`todo-${todo.id}`} checked={todo.completed} onChange={() => { toggleToDoAsCompleted(todo.id) }} />
                        <label htmlFor={`todo-${todo.id}`} >{todo.task}</label>

                        {
                            todo.completed && (
                                <button type='button' onClick={() => { handleDeleteTodo(todo.id) }}>Delete</button>
                            )
                        }

                    </li>
                })
            }
        </ul>
    )
}

export default ShowTodos