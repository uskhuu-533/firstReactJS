import { useState } from "react";
import Button from "./Button";

const Logs = (props) => {
  const { setDisplay, todos, setTodos, logdisplay } = props;
  const [selectedLog, setSelectedLog] = useState("All");
  const [select, setSelected] = useState("off");
  const logDisplayBlock = (display) => {
    setDisplay(display);
  };
  const selectON = (select) => {
    if (selectedLog == "Deleted") {
      setSelected(select);
    }
    const tasks = todos.map((todo) => {
      if (todo.select == "selected") {
        return { ...todo, select: null };
      } else {
        return todo;
      }
    });
    setTodos(tasks);
  };
  const selectDeletedTask = (id) => {
    if (select == "on" && selectedLog == "Deleted") {
      const tasks = todos.map((todo) => {
        if (todo.id == id && todo.select == "selected") {
          return { ...todo, select: null };
        } else if (todo.id == id) {
          return { ...todo, select: "selected" };
        } else {
          return todo;
        }
      });
      setTodos(tasks);
    }
  };
  const recoverDeletedTask = () => {
    const currentDate = new Date().toLocaleString();
    const tasks = todos.map((todo) => {
      if (todo.select == "selected") {
        return { ...todo, status: "Active",  select: null, logs: [...todo.logs ,{status:"Recovered", recoveredDate:currentDate}] };
      } else {
        return todo;
      }
    });
    setTodos(tasks);
  };
  return (
    <>
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
                  <div className="dateCont">
                  {todo.logs.map((log, index) => (
                      <div className="dateLog" key={index}>{log.status}: {log.addedDate} {log.reActiveDate} {log.completedDate} {log.deletedDate} {log.recoveredDate} </div>
                    ))}
               
                  </div>
                </div>
              ))}
          </div>
          <div className="buttonCont">
            {selectedLog == "Deleted" ? (
              <Button
                className="logButton"
                onClick={() => selectON("on")}
                text="Select"
              />
            ) : null}
            {select == "on" && selectedLog == "Deleted" ? (
              <Button
                className="logButton"
                onClick={() => selectON("off")}
                text="Cancel"
              />
            ) : null}
            {select == "on" && selectedLog == "Deleted" ? (
              <Button
                className="logButton"
                onClick={() => recoverDeletedTask()}
                text="Recover"
              />
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
};
export default Logs;
