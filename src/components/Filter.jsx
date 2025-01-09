import Button from "./Button";
const Filter = (props) => {
  const { setDisplay, filterState, todos, setFilterState } = props;
  const handleFilterStateChange = (state) => {
    setFilterState(state);
    console.log(state);
  };
  const logDisplayBlock = (display) => {
    setDisplay(display);
  };
  return (
    <>
      <div className="filterContainer">
        <Button
          className="button"
          onClick={() => handleFilterStateChange("All")}
          style={{
            background: filterState == "All" ? "#3c82f6" : "rgba(0, 0, 0, .1",
            color: filterState == "All" ? "white" : "#363636",
          }}
          text="All"
        />
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
        {todos.length > 0 ? (
          <Button
            className="button"
            onClick={() => logDisplayBlock("block")}
            id="log"
            text="log"
          />
        ) : null}
      </div>
    </>
  );
};
export default Filter;
