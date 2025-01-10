import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "./Button";
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
const Input = ({ todos, setTodos }) => {
  const [inputValue, setInputValue] = useState("");

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    if(inputValue.length !== 0){
    const currentDate = new Date().toLocaleString();
    setTodos([
      ...todos,
      {
        description: inputValue,
        status: "Active",
        id: uuidv4(),
        logs: [{status: "Added",  addedDate: currentDate, id: uuidv4()}]
       
      },
    ]);

    setInputValue("");
  }}

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit()
    }}
   
    window.addEventListener('keydown', handleKeyDown);


  return (
    <>
      <div className="inputContainer">
        <input
          placeholder="Add tasks.."
          className="input"
          value={inputValue}
          onChange={handleChange}
        />

        <Button
          className="button"
          id="selectedButton"
          onClick={handleSubmit}
          text="Add"
        />
      </div>
    </>
  );
};
export default Input;
