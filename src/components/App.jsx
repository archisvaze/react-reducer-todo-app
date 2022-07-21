import React, { useReducer } from 'react'
import Todo from "./Todo"
import darkBG from "../dark-mode.jpg"
import lightBG from "../light-mode.jpg"
import sun from "../sun.svg"
import moon from "../moon.svg"

function reducer(state, action) {
    switch (action.type) {
        case "toggle-darkmode":
            return { ...state, darkmode: !state.darkmode }
        case "complete":
            let todosClone = JSON.parse(JSON.stringify(state.todos))
            console.log(todosClone)
            for (let i = 0; i < todosClone.length; i++) {
                if (todosClone[i].id === action.payload) {
                    todosClone[i].completed = (!todosClone[i].completed);
                    let completedTodo = todosClone[i]
                    todosClone.splice(i, 1)
                    if (completedTodo.completed === false) todosClone.unshift(completedTodo)
                    else todosClone.push(completedTodo)
                    return { ...state, todos: todosClone, saved: "" }
                }
            }
        // eslint-disable-next-line
        case "save":
            return { ...state, saved: action.payload }
        case "add":
            let newTodo = {
                id: new Date().getTime(),
                content: state.saved,
                completed: false
            }
            return { ...state, todos: [newTodo, ...state.todos], saved: "" }
        case 'toggle-all':
            return { ...state, flag: 'all' }
        case 'toggle-completed':
            return { ...state, flag: 'completed' }
        case 'toggle-active':
            return { ...state, flag: 'active' }
        case 'clear-completed':
            let todosClone2 = JSON.parse(JSON.stringify(state.todos))
            for (let i = 0; i < todosClone2.length; i++) {
                if (todosClone2[i].completed === true) {
                    todosClone2.splice(i, 1);
                    i--;
                }
            }
            return { ...state, todos: todosClone2, saved: "" }
        default:
            return state
    }
}
export default function App() {

    let defaultState = { todos: [], saved: "", flag: 'all', darkmode: false };
    const [state, dispatch] = useReducer(reducer, defaultState);

    //localStorage



    let all = state.todos.length;
    let completed = 0;

    for (let obj of state.todos) {
        if (obj.completed === true) completed++;
    }
    let active = all - completed;

    //get date
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let date = new Date()

    if (state.todos.length <= 0) {
        return (
            <div className="body-container" style={{ backgroundImage: state.darkmode ? `url(${darkBG})` : `url(${lightBG})` }}>

                <div className="main">
                    <div style={{ color: state.darkmode ? "white" : "black" }} className="header">TODOs</div>
                    <button onClick={() => dispatch({ type: "toggle-darkmode" })} className="darkmode-toggle">
                        <img width={"20px"} src={state.darkmode ? moon : sun} alt="" />
                    </button>

                    <div style={{ color: state.darkmode ? "white" : "black" }} className="date">{` ${days[date.getDay()]}  ${months[date.getMonth()]} ${date.getDate()}`}</div>
                    <div className="add-container">
                        <input onChange={(e) => dispatch({ type: "save", payload: e.target.value })} onKeyPress={(e) => { if (e.key === 'Enter') { dispatch({ type: 'add' }) } }} type="text" value={state.saved} className="add-input" placeholder='Create a new Todo' />
                        <button onClick={() => { dispatch({ type: "add" }); }} className="add-button">+</button>
                    </div>
                    <div className="todos-container">
                        <h4 style={{margin: "auto auto", textShadow: "none"}}>Create a new Todo</h4>
                    </div>
                </div>
            </div>
        )
    } else return (
        <div className="body-container" style={{ backgroundImage: state.darkmode ? `url(${darkBG})` : `url(${lightBG})` }}>

            <div className="main">
                <div style={{ color: state.darkmode ? "white" : "black" }} className="header">TODOs</div>
                <button onClick={() => dispatch({ type: "toggle-darkmode" })} className="darkmode-toggle">
                    <img width={"20px"} src={state.darkmode ? moon : sun} alt="" />
                </button>

                <div style={{ color: state.darkmode ? "white" : "black" }} className="date">{` ${days[date.getDay()]}  ${months[date.getMonth()]} ${date.getDate()}`}</div>
                <div className="add-container">
                    <input onChange={(e) => dispatch({ type: "save", payload: e.target.value })} onKeyPress={(e) => { if (e.key === 'Enter') { dispatch({ type: 'add' }) } }} type="text" value={state.saved} className="add-input" placeholder='Create a new Todo' />
                    <button onClick={() => { dispatch({ type: "add" }); }} className="add-button">+</button>
                </div>

                <div className="todos-container">
                    {state.flag === 'all' ? state.todos.map(todoObj => {
                        return (
                            <Todo key={todoObj.id} todoObj={todoObj} dispatch={dispatch} />
                        )
                    }) : state.flag === 'active' ? state.todos.map(todoObj => {
                        if (todoObj.completed === false) {
                            return (
                                <Todo key={todoObj.id} todoObj={todoObj} dispatch={dispatch} />
                            )
                        } else return (<></>)
                    }) : state.todos.map(todoObj => {
                        if (todoObj.completed === true) {
                            return (
                                <Todo key={todoObj.id} todoObj={todoObj} dispatch={dispatch} />
                            )
                        } else return (<></>)
                    })
                    }
                </div>
                <div className="bottom-container">
                    <div className="left">{active} todos left</div>
                    <div className="toggles-container">

                        <button onClick={() => dispatch({ type: 'toggle-all' })} className="toggle all-toggle" style={{ color: state.flag === 'all' ? "#1283da" : "rgba(0, 0, 0, 0.4)", backgroundColor: state.flag === 'all' ? "rgba(255, 255, 255, 0.7)" : "transparent", fontWeight: state.flag === 'all' ? "bold" : "normal" }}>All</button>

                        <button onClick={() => dispatch({ type: 'toggle-active' })} className="toggle active-toggle" style={{ color: state.flag === 'active' ? "#1283da" : "rgba(0, 0, 0, 0.4)", backgroundColor: state.flag === 'active' ? "rgba(255, 255, 255, 0.7)" : "transparent", fontWeight: state.flag === 'active' ? "bold" : "normal" }}>Active</button>

                        <button onClick={() => dispatch({ type: 'toggle-completed' })} className="toggle completed-toggle" style={{ color: state.flag === 'completed' ? "#1283da" : "rgba(0, 0, 0, 0.4)", backgroundColor: state.flag === 'completed' ? "rgba(255, 255, 255, 0.7)" : "transparent", fontWeight: state.flag === 'completed' ? "bold" : "normal" }}>Completed</button>

                    </div>
                    <button onClick={() => dispatch({ type: 'clear-completed' })} className="clear-button">Clear Completed</button>
                </div>

            </div>

        </div>
    )
}



