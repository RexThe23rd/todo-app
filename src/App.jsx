import { Header } from "./components/Header"
import { Tabs } from './components/Tabs'
import { TodoList } from './components/TodoList'
import { TodoInput } from './components/TodoInput'
import { useState, useEffect } from 'react' 
function App() {
  
  // const todos = [
  //   { input: "check if the summer sale is still on", complete: true },
  //   { input: "finish the todo app", complete: false },
  //   { input: "study react", complete: false },
  //   { input: "get an idea for some music", complete: false },
  // ]

  const [todos, setTodos] = useState([
    { input: "Hi, Add your first todo!", complete: true }
  ])

  const [selectedTab, setSelectedTab] = useState('All');

  function handleAddTodo(newTodo){
    const newTodoList = [...todos, { input: newTodo, complete: false }]
    setTodos(newTodoList)
    handleSaveData(newTodoList);
  }

  function handleCompleteTodo(index){
    let newTodoList = [...todos];
    let completedTodo = todos[index];
    completedTodo['complete'] = true;
    newTodoList[index] = completedTodo;
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  }

  function handleDeleteTodo(index){
    let newTodoList = todos.filter((val, valIndex) => {
      return valIndex !== index
    })
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  }

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
