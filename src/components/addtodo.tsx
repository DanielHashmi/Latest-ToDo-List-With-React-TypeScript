import { useState, FormEvent } from "react"
import { useTodos } from "../store/todos"

const AddToDo = () => {
    const [todo, setToDo] = useState("")
    const { handleAddToDo } = useTodos()


    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        handleAddToDo(todo)
        setToDo("")
    }
    return (
        <form onSubmit={handleFormSubmit}>
            <input placeholder="Let's Do..." type="text" value={todo} onChange={(e) => setToDo(e.target.value)} />
            <button type="submit">To Do</button>
        </form>

    )
}

export default AddToDo