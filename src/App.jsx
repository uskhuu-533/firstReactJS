import { useState } from "react";
import "./App.css";
function createInitialTodos() {
  const initialTodos = [];
  return initialTodos;
}

function App() {
  const [todos, setTodos] = useState(createInitialTodos);
  const [text, setText] = useState("");

  return (
    <>
      <div className="app">
        <div className="board">
          <div className="container">
            <div className="tittle">
              <p>To-Do list</p>
            </div>
            <div className="inputContainer">
              <input
                className="input"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button
                className="button"
                id="addButton"
                onClick={() => {
                  setText("");
                  setTodos([
                    {
                      id: todos.length,
                      text: text,
                    },
                    ...todos,
                  ]);
                }}
              >
                <p>Add</p>
              </button>
            </div>
            <div className="filterContainer">
              <button className="button" id="allButton">
                <p>All</p>
              </button>
              <button className="button" id="avticeButton">
                <p>Active</p>
              </button>
              <button className="button" id="complatedButton">
                <p>Complated</p>
              </button>
            </div>
            <div className="taskCont" id="task">
              {todos.map((item) => (
                <div key={item.id} className="task">
                  <input type="checkbox" className="checkBox"/>
                  <p>{item.text}</p>
                  <button className="dltButton" onClick={(()=>todos.filter)}>Delete</button>
                </div>
              ))}
              {/* <p>No tasks yet. Add one above!</p> */}
            </div>
          </div>
          <div className="footContainer">
            <p>Powered by</p>
            <a href="">
              <p className="pinecone">Pinecone academy</p>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
