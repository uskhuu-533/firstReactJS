import { useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { use } from "react";
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filterState, setFilterState] = useState("All");
  const [logdisplay, setDisplay] = useState("none");
  const [selectedLog, setSelectedLog] = useState("All");
  const [select, setSelected] = useState("off");



  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    if (!inputValue.trim()) {
      return;
    }
    e.preventDefault();
    const currentDate = new Date().toLocaleString();
    setTodos([
      ...todos,
      {
        description: inputValue,
        status: "Active",
        id: uuidv4(),
        addedDate: currentDate,
      },
    ]);
    setInputValue("");
  }
  const handleDelete = (id) => {
    const currentDate = new Date().toLocaleString();
    const tasks = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, status: "Deleted", deletedDate: currentDate };
      }
      return todo;
    });
    setTodos(tasks);
  };

  const handleTaskChekBox = (id) => {
    const currentDate = new Date().toLocaleString();
    const tasks = todos.map((todo) => {
      if (todo.id === id) {
        if (todo.status === "Active") {
          return { ...todo, status: "Completed", completedDate: currentDate };
        } else if (todo.status === "Completed") {
          return { ...todo, status: "Active", completedDate: null };
        }
      }
      return todo;
    });
    setTodos(tasks);
  };

  const handleFilterStateChange = (state) => {
    setFilterState(state);
    console.log(state);
  };

  const handleDeleteAll = () => {
    const currentDate = new Date().toLocaleDateString();
    const tasks = todos.map((todo) => {
      if (todo.status == "Completed") {
        return { ...todo, status: "Deleted", deletedDate: currentDate };
      } else {
        return todo;
      }
    });
    setTodos(tasks);
  };

  const logDisplayBlock = (display) => {
    setDisplay(display);
    console.log(display);
  };
  const filteredTodos = todos.filter((todo) => todo.status !== "Deleted");
  const completedTodos = todos.filter((todo) => todo.status == "Completed");
  const activeTodos = todos.filter((todo) => todo.status == "Active");

  
  const selectON = (select) => {
    if (selectedLog== "Deleted") {
    setSelected(select);
    }
    const tasks = todos.map((todo) => {
      if (todo.select == "selected") {
          return {...todo, select:null}
        
      } else {
        return todo;
      }
    });
    setTodos(tasks);
    console.log(select);
  };
  const selectDeletedTask = (id) => {
    if (select == "on" && selectedLog== "Deleted") {
      const tasks = todos.map((todo) => {
        if (todo.id == id && todo.select == "selected") {
          return { ...todo, select: null };
        }else if(todo.id == id) {
          return {...todo, select:"selected" }
        } 
        else {
          return todo;
        }
      });
      setTodos(tasks);
      console.log(tasks);
    }
  };
  const recoverDeletedTask = () => {
    const tasks = todos.map((todo) => {
      if (todo.select == "selected") {
          return {...todo, status:"Active", deletedDate : null, select:null}
        
      } else {
        return todo;
      }
    });
    setTodos(tasks);
  };

  return (
    <>
      <div className="app">
        {
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
                <button
                  className="button"
                  id="selectedButton"
                  onClick={handleSubmit}
                >
                  <p>Add</p>
                </button>
              </div>
              <div className="filterContainer">
                <button
                  className="button"
                  onClick={() => handleFilterStateChange("All")}
                  style={{
                    background:
                      filterState == "All" ? "#3c82f6" : "rgba(0, 0, 0, .1",
                    color: filterState == "All" ? "white" : "#363636",
                  }}
                >
                  All
                </button>
                <button
                  className="button"
                  onClick={() => handleFilterStateChange("Active")}
                  style={{
                    background:
                      filterState == "Active" ? "#3c82f6" : "rgba(0, 0, 0, .1",
                    color: filterState == "Active" ? "white" : "#363636",
                  }}
                >
                  Active
                </button>
                <button
                  className="button"
                  onClick={() => handleFilterStateChange("Completed")}
                  style={{
                    background:
                      filterState == "Completed"
                        ? "#3c82f6"
                        : "rgba(0, 0, 0, .1",
                    color: filterState == "Completed" ? "white" : "#363636",
                  }}
                >
                  Completed
                </button>
                {todos.length > 0 ? (
                  <button
                    className="button"
                    onClick={() => logDisplayBlock("block")}
                    id="log"
                  >
                    log
                  </button>
                ) : null}
              </div>
              <div className="taskCont" id="task">
                {todos
                  .filter((todo) => {
                    if (filterState == "All") {
                      return todo.status !== "Deleted";
                    } else if (filterState == "Completed") {
                      return todo.status == "Completed";
                    } else if (filterState == "Active") {
                      return todo.status == "Active";
                    } else {
                      return true;
                    }
                  })
                  .map((todo) => (
                    <div className="task" key={todo.id}>
                      <input
                        type="checkbox"
                        className="checkBox"
                        checked={todo.status === "Completed"}
                        onChange={() => handleTaskChekBox(todo.id)}
                      />
                      <div>
                        <p>{todo.description}</p>
                      </div>
                      <button
                        className="deleteButton"
                        onClick={() => handleDelete(todo.id)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                {filteredTodos.length == 0 && filterState == "All" ? (
                  <p className="blutText">No tasks yet. Add one above!</p>
                ) : null}
                {completedTodos.length == 0 && filterState == "Completed" ? (
                  <p className="blutText">No active tasks found.</p>
                ) : null}
                {activeTodos.length == 0 && filterState == "Active" ? (
                  <p className="blutText">No completed tasks found.</p>
                ) : null}
              </div>
              {filteredTodos.length !== 0 ? (
                <div className="summaryCount">
                  <div className="count">
                    {completedTodos.length} of {filteredTodos.length} tasks
                    completed
                  </div>
                  {completedTodos.length !== 0 ? (
                    <button
                      className="clearCompleted"
                      onClick={() => handleDeleteAll()}
                    >
                      Clear Completed
                    </button>
                  ) : null}
                </div>
              ) : null}
            </div>
            <div className="footContainer">
              <p>Powered by</p>
              <a href="">
                <p className="pinecone">Pinecone academy</p>
              </a>
            </div>
          </div>
        }
        {logdisplay == "block" ? (
          <div className="allTasksContainer">
            <button
              className="removeLog"
              onClick={() => logDisplayBlock("")}
            ></button>
        

            <div>
              <h3>Logs</h3>
              <select
                name="logSelect"
                id="secectLog"
                className="selection"
                value={selectedLog}
                onChange={(e) => setSelectedLog(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="Deleted">Deleted</option>
              </select>
              {todos
                .filter((todo) => {
                  if (selectedLog == "Active") {
                    return todo.status == "Active";
                  } else if (selectedLog == "Completed") {
                    return todo.status == "Completed";
                  } else if (selectedLog == "Deleted") {
                    return todo.status == "Deleted";
                  } else {
                    return true;
                  }
                })
                .map((todo) => (
                  <div
                    key={todo.id}
                    className="taskLog"
                    onClick={() => selectDeletedTask(todo.id)}
                    style={{
                      border:
                        todo.select == "selected" && select == "on"
                          ? "solid"
                          : "white",
                    }}
                  >
                    <div>
                      <p>description : {todo.description}</p>
                    </div>
                    <div>
                      <p className="dateLog">Added: {todo.addedDate}</p>
                      <p className="dateLog">Completed: {todo.completedDate}</p>
                      <p className="dateLog">Deleted: {todo.deletedDate}</p>
                    </div>
                  </div>
                ))}
            </div>
            <div className="buttonCont">{selectedLog == "Deleted" ? (
              <button className="logButton" onClick={() => selectON("on")}>Select</button>
            ) : null}
            {select == "on" && selectedLog=="Deleted" ? (
              <button className="logButton" onClick={() => selectON("off")}>
                Cancel
              </button>
            ) : null}
            {select == "on" && selectedLog == "Deleted" ? (
              <button
                className="logButton"
                onClick={() => recoverDeletedTask()}
              >
                Recover
              </button>
            ) : null}</div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default App;
