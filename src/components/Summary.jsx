const Summary = (props) => {
  const { todos, setTodos } = props;
  const filteredTodos = todos.filter((todo) => todo.status !== "Deleted");
  const completedTodos = todos.filter((todo) => todo.status == "Completed");

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
  return (
    <>
      {filteredTodos.length !== 0 ? (
        <div className="summaryCount">
          <div className="count">
            {completedTodos.length} of {filteredTodos.length} tasks completed
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
    </>
  );
};
export default Summary;
