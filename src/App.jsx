import { useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import Input from "./components/Input";
import Filter from "./components/Filter";
import Logs from "./components/Logs";
import TodoCard from "./components/Todos-Card";
import Summary from "./components/Summary";
import Tittle from "./components/Tittle";
import Footer from "./components/Footer";

uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

function App() {
  const [todos, setTodos] = useState([]);
  const [filterState, setFilterState] = useState("All");
  const [logdisplay, setDisplay] = useState("none");
  return (
    <>
      <div className="app">
        {
          <div className="board">
            <div className="container">
              <Tittle />
              <Input todos={todos} setTodos={setTodos} />
              <Filter
                setFilterState={setFilterState}
                filterState={filterState}
                setDisplay={setDisplay}
                todos={todos}
              />
              <TodoCard
                todos={todos}
                setTodos={setTodos}
                filterState={filterState}
              />
              <Summary todos={todos} setTodos={setTodos} />
            </div>
            <Footer />
          </div>
        }
        <Logs
          setDisplay={setDisplay}
          todos={todos}
          setTodos={setTodos}
          logdisplay={logdisplay}
        />
      </div>
    </>
  );
}

export default App;
