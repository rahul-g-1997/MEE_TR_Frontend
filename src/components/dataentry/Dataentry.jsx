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
  const [question, setQuestion] = useState(""); // Added state for question
  const [isAddingSubItem, setIsAddingSubItem] = useState(false);
  const [editingItemIndex, setEditingItemIndex] = useState(null);
  const [editingSubItemIndex, setEditingSubItemIndex] = useState(null);
  const [addingSubItemIndex, setAddingSubItemIndex] = useState(null);

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

  // Function to handle question input field change
  const handleQuestionInputChange = (event) => {
    setQuestion(event.target.value);
  };

  // Function to add an item
  const addItem = () => {
    if (itemName.trim() !== "") {
      const newItem = { title: itemName, subItems: [] };
      setData([...data, newItem]);
      setItemName("");
      // sendDataToBackend();
    }
  };

  // Function to add a sub-item to an item
  const addSubItem = (itemIndex) => {
    if (subItemName.trim() !== "") {
      const newItem = {
        title: subItemName,
        description: subItemDescription,
        questions: [], // Initialize questions array
      };
      const newData = [...data];
      newData[itemIndex].subItems.push(newItem);
      setData(newData);
      setSubItemName("");
      setSubItemDescription("");
      setIsAddingSubItem(false);
      setAddingSubItemIndex(null); // Reset the index for adding sub-item
      sendDataToBackend();
    }
  };

  // Function to add a question to a sub-item
  const addQuestion = (itemIndex, subItemsIndex) => {
    if (question.trim() !== "") {
      const newQuestion = {
        question: question,
      };
      const newData = [...data];
      newData[itemIndex].subItems[subItemsIndex].questions.push(newQuestion);
      setData(newData);
      setQuestion("");
      sendDataToBackend();
    }
  };

  const handleAddSubItemClick = (index) => {
    setIsAddingSubItem(true);
    setAddingSubItemIndex(index);
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
    setItemName("");
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
      const response = await axios.get("/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Data sent successfully!");
    } catch (error) {
      console.error("Error sending data to the backend:", error);
    }
  };

  return (
    <div className={style.dashboardContainer}>
      <div className={style.itemContainer}>
        <div className={style.inputContainer}>
          <input
            type="text"
            value={itemName}
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
                  <DoneIcon
                    style={{ cursor: "pointer" }}
                    onClick={finishEditingItem}
                  >
                    Done
                  </DoneIcon>
                </div>
              ) : (
                <div>
                  <div className={style.itemTitle}>{item.title}</div>
                  <EditIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => startEditingItem(index)}
                  >
                    Edit Item
                  </EditIcon>
                  <DeleteForeverIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteItem(index)}
                  >
                    Delete Item
                  </DeleteForeverIcon>
                </div>
              )}
              <div className={style.addSubitemContainer}>
                {!isAddingSubItem ? (
                  <AddIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => handleAddSubItemClick(index)}
                  >
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
                    {/* Add input field for sub-item description */}
                    <SaveIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => addSubItem(index)}
                    >
                      Save Sub-Item
                    </SaveIcon>
                    <CancelIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => setIsAddingSubItem(false)}
                    >
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
                            className={style.subitemDescription}
                          />
                          {/* Add input field for editing sub-item description */}
                          <DoneIcon
                            style={{ cursor: "pointer" }}
                            onClick={finishEditingSubItem}
                          >
                            Done
                          </DoneIcon>
                        </div>
                      ) : (
                        <div>
                          <div className={style.inline}>
                            {" "}
                            <span className={style.subitemTitle}>
                              {subItem.title}
                            </span>
                            {/* Display sub-item description */}
                            <EditIcon
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                startEditingSubItem(index, subIndex)
                              }
                            >
                              Edit Sub-Item
                            </EditIcon>
                            <DeleteForeverIcon
                              style={{ cursor: "pointer" }}
                              onClick={() => deleteSubItem(index, subIndex)}
                            >
                              Delete Sub-Item
                            </DeleteForeverIcon>
                          </div>
                          <div className={style.subitemDescription}>
                            Description:- {"("}
                            {subItem.description}
                            {")"}
                          </div>
                          {/* Adding question functionality */}
                          <div className={style.inline}>
                            <input
                              type="text"
                              value={question}
                              onChange={handleQuestionInputChange}
                              placeholder="Enter question"
                            />
                            <SaveIcon
                              style={{ cursor: "pointer" }}
                              onClick={() => addQuestion(index, subIndex)}
                            >
                              Save Question
                            </SaveIcon>
                          </div>
                          <ul>
                            {subItem.questions.map((q, qIndex) => (
                              <li key={qIndex}>{q.question}</li>
                            ))}
                          </ul>
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
