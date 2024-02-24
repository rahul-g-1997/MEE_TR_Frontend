import { useEffect, useState } from "react";
import style from "./dataentry.module.css";
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
  const [question, setQuestion] = useState("");
  const [isAddingSubItem, setIsAddingSubItem] = useState(false);
  const [editingItemIndex, setEditingItemIndex] = useState(null);
  const [editingSubItemIndex, setEditingSubItemIndex] = useState(null);
  const [addingSubItemIndex, setAddingSubItemIndex] = useState(null);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState("");
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);

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
  // const handleQuestionInputChange = (event) => {
  //   setQuestion(event.target.value);
  // };

  // Function to handle edited question input field change
  const handleEditedQuestionInputChange = (event) => {
    setEditedQuestion(event.target.value);
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
        questions: [],
      };
      const newData = [...data];
      newData[itemIndex].subItems.push(newItem);
      setData(newData);
      setSubItemName("");
      setSubItemDescription("");
      setIsAddingSubItem(false);
      setAddingSubItemIndex(null);
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
      setIsAddingQuestion(false);
    }
  };

  // Function to delete a question from a sub-item
  const deleteQuestion = (itemIndex, subItemsIndex, questionIndex) => {
    const newData = [...data];
    newData[itemIndex].subItems[subItemsIndex].questions.splice(
      questionIndex,
      1
    );
    setData(newData);
  };

  // Function to edit a question in a sub-item
  const editQuestion = (itemIndex, subItemsIndex, questionIndex) => {
    setEditingQuestion({ itemIndex, subItemsIndex, questionIndex });
    setEditedQuestion(
      data[itemIndex].subItems[subItemsIndex].questions[questionIndex].question
    );
  };

  // Function to save edited question in a sub-item
  const saveEditedQuestion = () => {
    const newData = [...data];
    newData[editingQuestion.itemIndex].subItems[
      editingQuestion.subItemsIndex
    ].questions[editingQuestion.questionIndex].question = editedQuestion;
    setData(newData);
    setEditingQuestion(null);
    setEditedQuestion("");
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
    setSubItemName(data[itemIndex].subItems[subItemIndex].title); // Set initial subItemName
    setSubItemDescription(data[itemIndex].subItems[subItemIndex].description); // Set initial subItemDescription
  };

  // Function to finish editing a sub-item
  const finishEditingSubItem = () => {
    if (editingSubItemIndex !== null) {
      const { itemIndex, subItemIndex } = editingSubItemIndex;
      const newData = [...data];
      newData[itemIndex].subItems[subItemIndex].title = subItemName; // Update edited sub-item title
      newData[itemIndex].subItems[subItemIndex].description =
        subItemDescription; // Update edited sub-item description
      setData(newData);
      setEditingSubItemIndex(null);
    }
  };

  // Function to send the data to the backend
  // const sendDataToBackend = async () => {
  //   try {
  //     const response = await axios.post("/data", itemName.trim() , {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     console.log("Data sent successfully!", itemName.trim());
  //   } catch (error) {
  //     console.error("Error sending data to the backend:", error);
  //   }
  // };

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
          <SaveIcon style={{ cursor: "pointer" }} onClick={addItem}>
            Save
          </SaveIcon>
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

              {/* Add sub-item */}
              <div className={style.addSubitemContainer}>
                {!isAddingSubItem ? (
                  <AddIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setIsAddingSubItem(true);
                      setAddingSubItemIndex(index);
                    }}
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
                    <input type="file" />
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

              {/* Sub-items list */}
              <ol type="1" className={style.subItemlist}>
                {/* Unordered list for sub-items */}
                {item.subItems.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <div className={style.subitemContainer}>
                      {/* Sub-item title, edit/delete buttons, description */}
                      <div className={style.inline}>
                        {editingSubItemIndex &&
                        editingSubItemIndex.itemIndex === index &&
                        editingSubItemIndex.subItemIndex === subIndex ? (
                          <div className={style.inline}>
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
                            />
                            <DoneIcon
                              style={{ cursor: "pointer" }}
                              onClick={() => finishEditingSubItem()}
                            >
                              Done
                            </DoneIcon>
                          </div>
                        ) : (
                          <div>
                            <span className={style.subitemTitle}>
                              {subItem.title}
                            </span>
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
                        )}
                      </div>
                      <div className={style.subitemDescription}>
                        Description: {subItem.description}
                      </div>

                      {/* Add question */}
                      {isAddingQuestion ? ( // Ensure editing the correct sub-item
                        <div className={style.question}>
                          <input
                            type="text"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="Enter new question"
                          />
                          <SaveIcon
                            style={{ cursor: "pointer" }}
                            onClick={() => addQuestion(index, subIndex)}
                          >
                            Save New Question
                          </SaveIcon>
                        </div>
                      ) : (
                        <div className={style.addQuestionContainer}>
                          <AddIcon
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setIsAddingQuestion(true);
                              setAddingSubItemIndex({
                                itemIndex: index,
                                subItemIndex: subIndex,
                              });
                            }}
                          >
                            Add Question
                          </AddIcon>
                        </div>
                      )}

                      {/* Questions list */}
                      <ol type="a" className={style.question}>
                        {subItem.questions.map((q, qIndex) => (
                          <li key={qIndex}>
                            {/* Edit question */}
                            {editingQuestion &&
                            editingQuestion.itemIndex === index &&
                            editingQuestion.subItemsIndex === subIndex &&
                            editingQuestion.questionIndex === qIndex ? (
                              <div className={style.inline}>
                                <input
                                  type="text"
                                  value={editedQuestion}
                                  onChange={handleEditedQuestionInputChange}
                                />
                                <DoneIcon
                                  style={{ cursor: "pointer" }}
                                  onClick={saveEditedQuestion}
                                >
                                  Save
                                </DoneIcon>
                              </div>
                            ) : (
                              <div className={style.inline}>
                                {q.question}
                                {/* Edit and delete question buttons */}
                                <EditIcon
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    editQuestion(index, subIndex, qIndex)
                                  }
                                >
                                  Edit
                                </EditIcon>
                                <DeleteForeverIcon
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    deleteQuestion(index, subIndex, qIndex)
                                  }
                                >
                                  Delete
                                </DeleteForeverIcon>
                              </div>
                            )}
                          </li>
                        ))}
                      </ol>
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
