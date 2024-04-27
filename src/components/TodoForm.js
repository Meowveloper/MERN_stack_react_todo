import React, { useState } from "react";

export default function TodoForm({addTodo}) {

    const [title, setTitle ] = useState('');
    return (
        <form action="#" onSubmit={handleSubmit}>
            <input
                type="text"
                className="todo-input"
                placeholder="What do you need to do?"
                onChange={(e) => { setTitle(e.target.value) }}
                value={title}
            />
        </form>
    );

    function handleSubmit(e) {
        e.preventDefault();
        //add todo
        const todo = {
            id : new Date().getTime().toString(),
            title : title, 
            completed : false
        }
        addTodo(todo);
        //clear input

        setTitle('');
    }
}


