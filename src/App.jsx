import { Header } from "./components/Header"
import { Tabs } from './components/Tabs'
import { TodoList } from './components/TodoList'
import { TodoInput } from './components/TodoInput'
import { useState, useEffect } from 'react' 
function App() {
  
  const [todos, setTodos] = useState([
    { input: "Hi, Add your first todo!", complete: true }
  ])

  const [selectedTab, setSelectedTab] = useState('All');

  // Function to handle adding a new todo
  function handleAddTodo(newTodo){
    const newTodoList = [...todos, { input: newTodo, complete: false }]
    setTodos(newTodoList)
    handleSaveData(newTodoList);
  }

  // Function to handle completing a todo
  function handleCompleteTodo(index){
    let newTodoList = [...todos];
    let completedTodo = todos[index];
    completedTodo['complete'] = true;
    newTodoList[index] = completedTodo;
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  }

  // Function to handle deleting a todo
  function handleDeleteTodo(index){
    let newTodoList = todos.filter((val, valIndex) => {
      return valIndex !== index
    })
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  }

  //Saves data to localStorage
  function handleSaveData(currTodos) {
    localStorage.setItem('todo-app', JSON.stringify({ todos: currTodos }));
  }

  useEffect(() => {
    if (!localStorage || !localStorage.getItem('todo-app')){
      return;
    }
    let db = JSON.parse(localStorage.getItem('todo-app'));
    setTodos(db.todos);
  }, [])

  return (
    <>
      <Header todos={todos} />
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} todos={todos} />
      <TodoList handleCompleteTodo={handleCompleteTodo} handleDeleteTodo={handleDeleteTodo} selectedTab={selectedTab} todos={todos} />
      <TodoInput handleAddTodo={handleAddTodo} />
    </>
  )
}

export default App
