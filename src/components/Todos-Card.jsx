const TodoCard = (props) => {
  const { todos, setTodos, filterState } = props;
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

  const filteredTodos = todos.filter((todo) => todo.status !== "Deleted");
  const completedTodos = todos.filter((todo) => todo.status == "Completed");
  const activeTodos = todos.filter((todo) => todo.status == "Active");

  return (
    <>
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
    </>
  );
};
export default TodoCard;
