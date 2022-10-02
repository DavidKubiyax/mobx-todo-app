import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { ITodoStore, TodoStore } from "../stores/TodoStore";

export interface TodoContextState {
    todoStore?: ITodoStore
}

export const TodoContext = createContext<TodoContextState>({});

const TodoProvider = ({ children }: { children: ReactNode }) => {
    
    const [todoStore, setTodoStore] = useState<ITodoStore>();

    useEffect(() => {
        if (!todoStore) {
            setTodoStore(new TodoStore());
        }
    }, [todoStore] );

    return (
        <TodoContext.Provider value={{
            todoStore
        }}>
            {children}
        </TodoContext.Provider>
    );
}

export default TodoProvider;