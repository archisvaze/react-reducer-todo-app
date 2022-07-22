import React from 'react'

export default function Todo(props) {
    let todoObj = props.todoObj;
    let content = todoObj.content;
    let dispatch = props.dispatch;
    let completed = todoObj.completed;
    let id = todoObj.id;
    let tick = ""
    if (completed) tick = "✔"
    return (
        <div style={{margin : completed ? "0": "10px 0"}} className='todo'>
            <button onClick={() => { dispatch({ type: "complete", payload: id }) }} className="complete-button" style={{ backgroundColor: completed ? "rgb(127, 192, 135)" : "rgba(0, 0, 0, 0.5)", color: completed ? "white" : "black" }}>{tick}</button>
            <div className="todo-title" style={{ textDecorationLine: completed ? "line-through" : "none" }}>
                {content}</div>
        </div>
    )
}
