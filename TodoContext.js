
import React, {useState, createContext} from 'react';
import Todo from './Screens/Todo';


// making a new context
export const TodoContext = createContext({});
// create a provider component

export const ContextProvider = ({children}) =>  {
    const [todoList, setTodoList] = useState([]);
    const addToList = () => {
        setTodoList([...todoList, {}])
    }
    return (
        <TodoContext.Provider value={{todoList, addToList}}>
            {children}
        </TodoContext.Provider>
    )
}

