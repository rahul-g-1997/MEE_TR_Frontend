import  { useState } from "react";
import "./dashboard.module.css";
import axios from "axios";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [itemName, setItemName] = useState("");
  const [subItemName, setSubItemName] = useState("");
  const [subItemDescription, setSubItemDescription] = useState("");
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [isAddingSubItem, setIsAddingSubItem] = useState(false);
  const [editingItemIndex, setEditingItemIndex] = useState(null);
  const [editingSubItemIndex, setEditingSubItemIndex] = useState(null);

  // Function to handle item input field change
  const handleItemInputChange = (event) => {
    setItemName(event.target.value);
  };

  // Function to handle sub-item input field change
  const handleSubItemInputChange = (event) => {
    setSubItemName(event.target.value);
  };

  // Function to handle sub-item description field change
  const handleSubItemDescriptionChange = (event) => {
    setSubItemDescription(event.target.value);
  };

  // Function to add an item
  const addItem = () => {
    if (itemName.trim() !== "") {
      const newItem = { title: itemName, subItems: [] };
      setData([...data, newItem]);
      setItemName("");
      setIsAddingItem(false);
    }
  };

  // Function to add a sub-item to an item
  const addSubItem = (itemIndex) => {
    if (subItemName.trim() !== "") {
      const newItem = { title: subItemName, description: subItemDescription };
      const newData = [...data];
      newData[itemIndex].subItems.push(newItem);
      setData(newData);
      setSubItemName("");
      setSubItemDescription("");
      setIsAddingSubItem(false);
    }
  };

  // Function to delete an item by index
  const deleteItem = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  // Function to delete a sub-item from an item
  const deleteSubItem = (itemIndex, subItemIndex) => {
    const newData = [...data];
    newData[itemIndex].subItems.splice(subItemIndex, 1);
    setData(newData);
  };

  // Function to start editing an item
  const startEditingItem = (index) => {
    setEditingItemIndex(index);
    setItemName(data[index].title);
  };

  // Function to finish editing an item
  const finishEditingItem = () => {
    setEditingItemIndex(null);
  };

  // Function to start editing a sub-item
  const startEditingSubItem = (itemIndex, subItemIndex) => {
    setEditingSubItemIndex({ itemIndex, subItemIndex });
    setSubItemName(data[itemIndex].subItems[subItemIndex].title);
    setSubItemDescription(data[itemIndex].subItems[subItemIndex].description);
  };

  // Function to finish editing a sub-item
  const finishEditingSubItem = () => {
    setEditingSubItemIndex(null);
  };

  // Function to send the data to the backend
  const sendDataToBackend = async () => {
    try {
      console.log(data);
      const response = await axios.post("/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Data sent successfully!", response.data);
    } catch (error) {
      console.error("Error sending data to the backend:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="add-item-container">
        {!isAddingItem ? (
          <button onClick={() => setIsAddingItem(true)}>Add Item</button>
        ) : (
          <div>
            <input
              type="text"
              value={itemName}
              onChange={handleItemInputChange}
              placeholder="Enter item name"
            />
            <button onClick={addItem}>Save Item</button>
            <button onClick={() => setIsAddingItem(false)}>Cancel</button>
          </div>
        )}
      </div>
      <ol type="A">
        {/* Ordered list for items */}
        {data.map((item, index) => (
          <li key={index}>
            <div className="item-container">
              {editingItemIndex === index ? (
                <div>
                  <input
                    type="text"
                    value={itemName}
                    onChange={(e) => {
                      const newData = [...data];
                      newData[index].title = e.target.value;
                      setData(newData);
                      setItemName(e.target.value);
                    }}
                  />
                  <button onClick={finishEditingItem}>Done</button>
                </div>
              ) : (
                <div>
                  <div className="item-title">{item.title}</div>
                  <button onClick={() => startEditingItem(index)}>
                    Edit Item
                  </button>
                  <button onClick={() => deleteItem(index)}>Delete Item</button>
                </div>
              )}
              <div className="add-subitem-container">
                {!isAddingSubItem ? (
                  <button onClick={() => setIsAddingSubItem(true)}>
                    Create Sub-Item
                  </button>
                ) : (
                  <div>
                    <input
                      type="text"
                      value={subItemName}
                      onChange={handleSubItemInputChange}
                      placeholder="Enter sub-item name"
                    />
                    <input
                      type="text"
                      value={subItemDescription}
                      onChange={handleSubItemDescriptionChange}
                      placeholder="Enter sub-item description"
                    />{" "}
                    {/* Add input field for sub-item description */}
                    <button onClick={() => addSubItem(index)}>
                      Save Sub-Item
                    </button>
                    <button onClick={() => setIsAddingSubItem(false)}>
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              <ol type="1">
                {/* Unordered list for sub-items */}
                {item.subItems.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <div className="subitem-container">
                      {editingSubItemIndex &&
                      editingSubItemIndex.itemIndex === index &&
                      editingSubItemIndex.subItemIndex === subIndex ? (
                        <div>
                          <input
                            type="text"
                            value={subItemName}
                            onChange={(e) => setSubItemName(e.target.value)}
                          />
                          <input
                            type="text"
                            value={subItemDescription}
                            onChange={(e) =>
                              setSubItemDescription(e.target.value)
                            }
                          />{" "}
                          {/* Add input field for editing sub-item description */}
                          <button onClick={finishEditingSubItem}>Done</button>
                        </div>
                      ) : (
                        <div>
                          <div className="subitem-title">{subItem.title}</div>
                          <div className="subitem-description">
                            {subItem.description}
                          </div>{" "}
                          {/* Display sub-item description */}
                          <button
                            onClick={() => startEditingSubItem(index, subIndex)}
                          >
                            Edit Sub-Item
                          </button>
                          <button
                            onClick={() => deleteSubItem(index, subIndex)}
                          >
                            Delete Sub-Item
                          </button>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </li>
        ))}
      </ol>
      <button onClick={sendDataToBackend}>Save data</button>
    </div>
  );
};

export default Dashboard;
