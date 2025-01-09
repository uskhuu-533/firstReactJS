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
