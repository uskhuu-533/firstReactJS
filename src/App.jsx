import { useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filterState, setFilterState] = useState("All");

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    if (inputValue == "") {
      alert("");
    } else {
      e.preventDefault();
      setTodos([
        ...todos,
        { description: inputValue, status: "Active", id: uuidv4() },
      ]);
      setInputValue("");
    }
  }
  const handleDelete = (status) => {
    const tasks = todos.map((todo) => {
      return {...todo, status:"Deleted"}
    });
    setTodos(tasks)
  };

  const handleTaskChekBox = (id) => {
    const tasks = todos.map((todo) => {
      if (todo.id == id && todo.status == "Active") {
        return { ...todo, status: "Completed" };
      } else if (todo.id == id && todo.status == "Completed") {
        return { ...todo, status: "Active" };
      } else {
        return todo;
      }
    });
    setTodos(tasks);
    console.log(tasks);
  };

  const handleFilterStateChange = (state) => {
    setFilterState(state);
    console.log(state);
  };

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
                placeholder="Add tasks.."
                className="input"
                value={inputValue}
                onChange={handleChange}
              />
              <button className="button" id="selectedButton" onClick={handleSubmit}>
                <p>Add</p>
              </button>
            </div>
            <div className="filterContainer">
              <button
                className="button"
                onClick={() => handleFilterStateChange("All")}
                style={{background:filterState== "All" ? "#3c82f6":"white" }}
              >
                All
              </button>
              <button
                className="button"
                onClick={() => handleFilterStateChange("Active")}
                style={{background:filterState== "Active" ? "#3c82f6":"white" }}
              >
                Active
              </button>
              <button
                className="button"
                onClick={() => handleFilterStateChange("Completed")}
                style={{background:filterState== "Completed" ? "#3c82f6":"white" }}
              >
                Completed
              </button>
            </div>
            <div className="taskCont" id="task">
              {todos
                .filter((todo) => {
                  if(filterState == "All") {
                    return todo.status == "Active" ||"Completed"
                  }
                  else if (filterState == "Completed") {
                    return todo.status == "Completed";
                  } else if (filterState == "Active") {
                    return todo.status == "Active";
                  }
                  // else if(filterState=="Deleted"){
                  //   return todo.status == "Deleted"}
                  else {
                    return true;
                  }
                })
                .map((todo, index) => (
                  <div key={index} className="task">
                    <input
                      type="checkbox"
                      className="checkBox"
                      checked={todo.status == "Completed"}
                      onChange={() => handleTaskChekBox(todo.id)}
                    />
                    {todo.description}
                    <button
                      className="deleteButton"
                      onClick={() => handleDelete(todo.status)}
                    >
                      Delete
                    </button>
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
