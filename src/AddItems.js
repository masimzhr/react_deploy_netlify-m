import { FaPlus } from "react-icons/fa";
import { useRef } from "react";
const AddItems = ({ handleSubmit, newItem, setNewItem }) => {
  const inputRef = useRef();
  return (
    <form className="addForm" onSubmit={handleSubmit}>
      <label htmlFor="AddItem"></label>
      <input
        autoFocus
        ref={inputRef}
        required
        type="text"
        id="AddItem"
        placeholder="Add Item"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button
        type="submit"
        aria-label="Add Item"
        onClick={() => inputRef.current.focus()}
      >
        <FaPlus />
      </button>
    </form>
  );
};

export default AddItems;
