import { useEffect } from 'react';
import './App.css';
import TodoList from './components/todo/todo-list/TodoList';
import todoStore from './components/todo/TodoStore';

function App() {

  useEffect(() => {
    if (todoStore.todoItems.length === 0) {
      // without this condition, this useEffect will be called twice.
      todoStore.init();
    }
  }, [])

  return (
    <div className="App">
      <TodoList/>
    </div>
  );
}

export default App;
