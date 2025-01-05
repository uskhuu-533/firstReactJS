import { useState } from "react";
import "./App.css";
function createInitialTodos() {
  const initialTodos = [];
  return initialTodos;
}

function App() {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')

function handleChange(e){
  setInputValue(e.target.value)
}

function handleSubmit(e){
  if (inputValue==""){
    alert("")
  }else{
  e.preventDefault()
  setTodos([...todos, inputValue])
  setInputValue('')
  }
}

function handleDelete(index){
  alert("a")
  const newTodos = [...todos]
  newTodos.splice(index, 1)
  setTodos(newTodos)
}
  // function deleteTask(){
  //   return 
  // }

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
                value={inputValue}
                onChange={handleChange}
              />
              <button
                className="button"
                id="addButton"
                onClick={handleSubmit}
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
              {todos.map((todo, index) => (
                <div key={index} className="task">
                  <input type="checkbox" className="checkBox"/>
                  <p>{todo}</p>
                  <button className="dltButton" onClick={handleDelete}>Delete</button>
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
