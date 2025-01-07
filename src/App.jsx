import { useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filterState, setFilterState] = useState("All");
  const [countCompletedTasks, SetCompletedCount] = useState(0);

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    if (inputValue.length == 0) {
      return null;
    } else {
      e.preventDefault();
      setTodos([
        ...todos,
        { description: inputValue, status: "Active", id: uuidv4() },
      ]);
      setInputValue("");
    }
  }
  const handleDelete = (id) => {
    const tasks = todos.map((todo) => {
      if (todo.id == id) {
        return { ...todo, status: "Deleted" };
      } else {
        return todo;
      }
    });
    setTodos(tasks);
    console.log(tasks);
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
    // console.log(tasks);
  };

  const handleFilterStateChange = (state) => {
    setFilterState(state);
    console.log(state);
  };

  const handleDeleteAll = () => {
    const tasks = todos.map((todo) => {
      if (todo.status == "Completed") {
        return { ...todo, status: "Deleted" };
      } else {
        return todo;
      }
    });
    setTodos(tasks);
  };
  const filteredTodos = todos.filter((todo) => todo.status !== "Deleted");
  console.log(filteredTodos);
  const completedTodos = todos.filter((todo) => todo.status == "Completed");
  const activeTodos = todos.filter((todo)=>todo.status=="Active")

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
                    filterState == "Completed" ? "#3c82f6" : "rgba(0, 0, 0, .1",
                  color: filterState == "Completed" ? "white" : "#363636",
                }}
              >
                Completed
              </button>
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
                  <div className="task">
                    <input
                      type="checkbox"
                      className="checkBox"
                      checked={todo.status == "Completed"}
                      onChange={() => handleTaskChekBox(todo.id)}
                    />
                    {todo.description}
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
                {(completedTodos.length!==0)?
                  <button
                  className="clearCompleted"
                  onClick={() => handleDeleteAll()}
                >
                  Clear Completed
                </button>:null}
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
      </div>
    </>
  );
}

export default App;
