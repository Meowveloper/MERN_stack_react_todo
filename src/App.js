import "./reset.css";
import "./App.css";
import TodoForm from "./components/TodoForm.js";
import TodoList from "./components/TodoList.js";
import CheckAllAndRemaining from "./components/CheckAllAndRemaining.js";
import TodoFilters from "./components/TodoFilters.js";
import ClearCompleted from "./components/ClearCompleted.js";
import { useCallback, useEffect, useState } from "react";

function App() {
    const [todos, setTodos] = useState([]);
    const [filteredTodos, setFilteredTodos] = useState(todos);

    useEffect(() => {
        fetch("http://localhost:3001/todos", {
            method: "GET",
        })
            .then((res) => {
                return res.json();
            })
            .then((todos) => {
                setTodos(todos);
                setFilteredTodos(todos);
            });
    }, []);

    const filterBy = useCallback((type) => {
      if(type === "All") {
        setFilteredTodos(todos);
      } else if(type === "Active") {
        setFilteredTodos(
          [...todos].filter(item => !item.completed)
        )        
      } else {
        setFilteredTodos(
          [...todos].filter(item => item.completed)
        ) 
      }
    }, [todos]);

    return (
        <div className="todo-app-container">
            <div className="todo-app">
                <h2>Todo App</h2>
                <TodoForm addTodo={addTodo}></TodoForm>

                <TodoList
                    todos={filteredTodos}
                    deleteTodo={deleteTodo}
                    updateTodo={updateTodo}
                ></TodoList>

                <CheckAllAndRemaining
                    remainingCount={
                        todos.filter((todo) => !todo.completed).length
                    }
                    checkAll={checkAll}
                ></CheckAllAndRemaining>

                <div className="other-buttons-container">
                    <TodoFilters filterBy={filterBy}></TodoFilters>

                    <ClearCompleted
                        clearCompleted={clearCompleted}
                    ></ClearCompleted>
                </div>
            </div>
        </div>
    );

    function addTodo(todo) {
        //update the data at the server side
        fetch("http://localhost:3001/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(todo),
        });
        //update the data at the client side
        setTodos((previousTodos) => [...previousTodos, todo]);
    }

    function deleteTodo(todoId) {
        //delete in the server side
        fetch(`http://localhost:3001/todos/${todoId}`, {
            method: "DELETE",
        });
        //delete in the client side
        setTodos((prev) => {
            return [...prev].filter((item) => {
                return item.id !== todoId;
            });
        });
    }

    function updateTodo(todo) {
        //server update
        fetch(`http://localhost:3001/todos/${todo.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(todo),
        });

        //client update
        setTodos((prevStage) => {
            return prevStage.map((item) => {
                if (item.id === todo.id) return todo;
                else return item;
            });
        });
    }

    function checkAll() {
        //server
        [...todos].forEach((item) => {
            updateTodo({ ...item, completed: true });
        });

        //client change
        setTodos((prev) => {
            return prev.map((item) => {
                return { ...item, completed: true };
            });
        });
    }

    function clearCompleted() {
        //serverUpdate
        [...todos]
            .filter((item) => item.completed)
            .forEach((item) => {
                deleteTodo(item.id);
            });

        //clientUpdate
        setTodos((prev) => {
            return [...prev].filter((item) => !item.completed);
        });
    }

    
}

export default App;
