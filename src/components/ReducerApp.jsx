import { useReducer } from "react";


function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      let newCount = state.count + 1;
      return { ...state, count: newCount }
    case 'decrement':
      return { ...state, count: state.count - 1 }
    case "themeSwitch":
      return { ...state, theme: state.theme === "light" ? "dark" : "light" }
    case "nameSwitch":
      return { ...state, name: action.payload }
    default:
      return state;
  }
}



function ReducerApp() {


  let [state, dispatch] = useReducer(reducer, { count: 0, theme: 'light', name: 'archis' });


  return (
    <div className="app">
      <div className="row">
        <button onClick={() => dispatch({ type: 'decrement' })} className="action">-</button>
        {state.count}
        <button onClick={() => dispatch({ type: 'increment' })} className="action">+</button>

      </div>

      <div className="row">
        <button className="action" onClick={() => dispatch({ type: 'themeSwitch' })} >Update Theme</button>
        Current Theme: {state.theme}
      </div>

      <div className="row">
        <input onChange={(e) => dispatch({ type: 'nameSwitch', payload: e.target.value })} type="text" />
        <p>Hi! {state.name}</p>
      </div>
    </div>
  );
}

export default ReducerApp;
