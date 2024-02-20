import AddToDo from "./components/addtodo"
import Navbar from "./components/navbar"
import ShowTodos from "./components/showtodos"
import "./App.css"
const App = () => {
  return (
    <main>
      <h1>Latest ToDo List App</h1>
      <Navbar />
      <AddToDo />
      <ShowTodos />

    </main>
  )
}

export default App  