import { ReactNode, createContext, useContext, useState } from "react";

export type TodosProviderProps = {
    children: ReactNode
}

export type Todo = {
    id: string;
    task: string;
    completed: boolean;
    createdAt: Date;
}

export type TodosContext = {
    todos: Todo[];
    handleAddToDo: (task: string) => void
    toggleToDoAsCompleted: (id: string) => void
    handleDeleteTodo: (id: string) => void

}

export const todosContext = createContext<TodosContext | null>(null)

export const TodosProvideer = ({ children }: TodosProviderProps) => {
    const [todos, setToDos] = useState<Todo[]>(() => {

        try {
            const newTodo = localStorage.getItem("todos") || "[]";
            return JSON.parse(newTodo) as Todo[]
        } catch (error) {
            return []
        }
    })


    const handleAddToDo = (task: string) => {
        setToDos((prev) => {
            const newTodos: Todo[] = [
                {
                    id: Math.random().toString(),
                    task: task,
                    completed: false,
                    createdAt: new Date()
                },
                ...prev
            ]

            localStorage.setItem("todos", JSON.stringify(newTodos))
            return newTodos
        })
    }
    //  Toggle CheckBox
    const toggleToDoAsCompleted = (id: string) => {
        setToDos((prev) => {
            let newPrev = prev.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, completed: !todo.completed }
                }
                return todo;
            })
            localStorage.setItem("todos", JSON.stringify(newPrev))
            return newPrev
        })
    }
    // Delete single TODO
    const handleDeleteTodo = (id: string) => {
        setToDos((prev) => {
            let newTodos = prev.filter((filterToDo) => filterToDo.id !== id);
            localStorage.setItem("todos", JSON.stringify(newTodos))
            return newTodos
        })
    }

    return <todosContext.Provider value={{ todos, handleAddToDo, toggleToDoAsCompleted, handleDeleteTodo }}>
        {children}
    </todosContext.Provider>
}

// consumer

export const useTodos = () => {
    const todosConsumer = useContext(todosContext);
    if (!todosConsumer) {
        throw new Error("useTodos used outside of Provider")
    }
    return todosConsumer
}