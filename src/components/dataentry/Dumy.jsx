import { useState } from "react";
import style from "./Dumy.module.css"; // Import CSS file for styling

export default function Dumy() {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedValue, setEditedValue] = useState("");
  const [subItemValue, setSubItemValue] = useState("");
  const [editingSubItemIndex, setEditingSubItemIndex] = useState(null);
  const [editedSubItemValue, setEditedSubItemValue] = useState("");
  const [addingSubItemIndex, setAddingSubItemIndex] = useState(null); // State to track which item is adding a sub-item

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSave = () => {
    if (inputValue.trim() !== "") {
      setItems([...items, { name: inputValue, subItems: [] }]);
      setInputValue("");
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedValue(items[index].name);
  };

  const handleItemChange = (event) => {
    setEditedValue(event.target.value);
  };

  const handleSaveEdit = () => {
    if (editedValue.trim() !== "") {
      const newItems = [...items];
      newItems[editingIndex].name = editedValue;
      setItems(newItems);
      setEditingIndex(null);
    }
  };

  const handleDelete = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleAddSubItem = (index) => {
    if (addingSubItemIndex === index) {
      setAddingSubItemIndex(null); // Close the input field if it's already open
    } else {
      setAddingSubItemIndex(index); // Open the input field for this item
    }
  };

  const handleEditSubItem = (index, subIndex) => {
    setEditingSubItemIndex({ index, subIndex });
    setEditedSubItemValue(items[index].subItems[subIndex]);
  };

  const handleSubItemChange = (event) => {
    setEditedSubItemValue(event.target.value);
  };

  const handleSaveSubItemEdit = (index, subIndex) => {
    if (editedSubItemValue.trim() !== "") {
      const newItems = [...items];
      newItems[index].subItems[subIndex] = editedSubItemValue;
      setItems(newItems);
      setEditingSubItemIndex(null);
    }
  };

  const handleDeleteSubItem = (index, subIndex) => {
    const newItems = [...items];
    newItems[index].subItems.splice(subIndex, 1);
    setItems(newItems);
  };

  return (
    <div className={style.inputoutputform}>
      <div className={style.iteminput}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter item"
        />
        <button onClick={handleSave}>Save</button>
      </div>
      <ol type="A" className={style.itemlist}>
        {items.map((item, index) => (
          <li key={index}>
            <div className={style.inline}>
              {editingIndex === index ? (
                <div className={style.inline}>
                  <input
                    type="text"
                    value={editedValue}
                    onChange={handleItemChange}
                  />
                  <button onClick={handleSaveEdit}>Save</button>
                </div>
              ) : (
                <div className={style.inline}>
                  {item.name}
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                  <div className={style.nextline}>
                    <button onClick={() => handleAddSubItem(index)}>
                      Add Sub-Item
                    </button>
                    {addingSubItemIndex === index && (
                      <div className={style.inline}>
                        <input
                          type="text"
                          value={subItemValue}
                          onChange={(e) => setSubItemValue(e.target.value)}
                          placeholder="Enter sub-item"
                        />
                        <button
                          onClick={() => {
                            if (subItemValue.trim() !== "") {
                              const newItems = [...items];
                              newItems[index].subItems.push(subItemValue);
                              setItems(newItems);
                              setSubItemValue("");
                              setAddingSubItemIndex(null);
                            }
                          }}
                        >
                          Save Sub-Item
                        </button>
                      </div>
                    )}
                    <ol type="1">
                      {item.subItems.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <div className={style.inline}>
                            {editingSubItemIndex &&
                            editingSubItemIndex.index === index &&
                            editingSubItemIndex.subIndex === subIndex ? (
                              <div className={style.inline}>
                                <input
                                  type="text"
                                  value={editedSubItemValue}
                                  onChange={handleSubItemChange}
                                />
                                <button
                                  onClick={() =>
                                    handleSaveSubItemEdit(index, subIndex)
                                  }
                                >
                                  Save
                                </button>
                              </div>
                            ) : (
                              <div className={style.inline}>
                                {subItem}
                                <button
                                  onClick={() =>
                                    handleEditSubItem(index, subIndex)
                                  }
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteSubItem(index, subIndex)
                                  }
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
