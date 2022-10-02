import { useEffect } from 'react';
import './App.css';
import TodoList from './components/todo/todo-list/TodoList';
import TodoProvider from './data/contexts/TodoContext';

function App() {
  return (
    <div className="App">
      <TodoProvider>
        <TodoList/>
      </TodoProvider>
    </div>
  );
}

export default App;
