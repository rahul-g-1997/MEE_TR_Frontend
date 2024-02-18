import { useEffect, useState } from "react";
import style from "./dataentry.module.css";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import DoneIcon from "@mui/icons-material/Done";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

export default function Dataentry() {
  const [data, setData] = useState([]);
  const [itemName, setItemName] = useState("");
  const [subItemName, setSubItemName] = useState("");
  const [subItemDescription, setSubItemDescription] = useState("");
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
    }
  };

  // Function to add a sub-item to an item
  const addSubItem = (itemIndex) => {
    if (subItemName.trim() !== "") {
      const newItem = {
        title: subItemName,
        description: subItemDescription,
      };
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
  // const sendDataToBackend = async () => {
  //   try {
  //     console.log(data);
  //     const response = await axios.get("/login", data, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     console.log("Data sent successfully!", response.data);
  //   } catch (error) {
  //     console.error("Error sending data to the backend:", error);
  //   }
  // };

  useEffect(() => {
    axios
      .get("/api/data")
      .then(function (response) {
        console.log("Message from backend:", response.data);
        // Now you can use the message received from the backend as needed in your frontend
      })
      .catch(function (error) {
        console.log("Error fetching data:", error);
      });
  }, []);

  return (
    <div className={style.dashboardContainer}>
      <div className={style.itemContainer}>
        <div className={style.inputContainer}>
          <input
            type="text"
            value={itemName} // Accessing itemName property here
            onChange={handleItemInputChange}
            placeholder="Enter item name"
          />
          <button onClick={addItem}>Save</button>
        </div>
      </div>

      <ol type="A">
        {/* Ordered list for items */}
        {data.map((item, index) => (
          <li key={index}>
            <div className={style.itemContainer}>
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
                  <DoneIcon onClick={finishEditingItem}>Done</DoneIcon>
                </div>
              ) : (
                <div>
                  <div className={style.itemTitle}>{item.title}</div>
                  <EditIcon onClick={() => startEditingItem(index)}>
                    Edit Item
                  </EditIcon>
                  <DeleteForeverIcon onClick={() => deleteItem(index)}>
                    Delete Item
                  </DeleteForeverIcon>
                </div>
              )}
              <div className={style.addSubitemContainer}>
                {!isAddingSubItem ? (
                  <AddIcon onClick={() => setIsAddingSubItem(true)}>
                    Create Sub-Item
                  </AddIcon>
                ) : (
                  <div className={style.inline}>
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
                    />
                    <input type="file" />
                    {/* Add input field for sub-item description */}
                    <SaveIcon onClick={() => addSubItem(index)}>
                      Save Sub-Item
                    </SaveIcon>
                    <CancelIcon onClick={() => setIsAddingSubItem(false)}>
                      Cancel
                    </CancelIcon>
                  </div>
                )}
              </div>
              <ol type="1" className={style.subItemlist}>
                {/* Unordered list for sub-items */}
                {item.subItems.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <div className={style.subitemContainer}>
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
                            className={style.subitemDescription} // Add this className
                          />
                          {/* Add input field for editing sub-item description */}
                          <DoneIcon onClick={finishEditingSubItem}>
                            Done
                          </DoneIcon>
                        </div>
                      ) : (
                        <div>
                          <div className={style.subitemTitle}>
                            {subItem.title}
                          </div>
                          <div className={style.subitemDescription}>
                            {subItem.description}
                          </div>{" "}
                          {/* Display sub-item description */}
                          <EditIcon
                            onClick={() => startEditingSubItem(index, subIndex)}
                          >
                            Edit Sub-Item
                          </EditIcon>
                          <DeleteForeverIcon
                            onClick={() => deleteSubItem(index, subIndex)}
                          >
                            Delete Sub-Item
                          </DeleteForeverIcon>
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
      {/* <button onClick={sendDataToBackend}>Save data</button> */}
    </div>
  );
}
