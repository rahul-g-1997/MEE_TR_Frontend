import style from "./formGenerator.module.css";
import Button from "@mui/material/Button";
import { useEffect } from "react";


function FormGenerator({
  fields,
  setFields,
  editMode,
  setEditMode,
  newField,
  setNewField,
  toggleRightDrawer,
  form,
  setForm,
  selectedElement,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewField({ ...newField, [name]: value });
  };

  // Inside your component function
  const handleAddField = () => {
    if (editMode) {
      // Update fields in edit mode
      const updatedFields = fields.map((field) => {
        if (field.id === newField.id) {
          return newField;
        }
        return field;
      });
      setFields(updatedFields);
      setEditMode(false);
    } else {
      // Add new field in create mode
      const id = new Date().getTime().toString();
      setFields([...fields, { ...newField, id }]);
      setForm((prevForm) => {
        // Update form state using the previous state
        return prevForm.map((item) => {
          if (item.Element === selectedElement) {
            return {
              ...item,
              Indicator: [
                ...item.Indicator,
                {
                  id,
                  label: newField.label,
                  type: newField.type,
                  placeholder: newField.placeholder,
                },
              ],
            };
          }
          return item;
        });
      });
    }
    // Reset new field values and toggle drawer
    setNewField({ id: "", label: "", type: "text", placeholder: "" });
    toggleRightDrawer();
  };

  // Use useEffect to log form state after it's updated
  useEffect(() => {
    console.log(form);
  }, [form]);

  return (
    <div className={style.container}>
      <h3>Add Custom Field</h3>
      <div className={style.inputGroup}>
        <label htmlFor="labelInput">Label:</label>
        <input
          id="labelInput"
          type="text"
          name="label"
          value={newField.label}
          onChange={handleChange}
        />
      </div>
      <div className={style.inputGroup}>
        <label htmlFor="typeSelect">Type:</label>
        <select
          id="typeSelect"
          name="type"
          value={newField.type}
          onChange={handleChange}
        >
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="email">Email</option>
          <option value="file">Document attach</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div className={style.inputGroup}>
        <label htmlFor="placeholderInput">Placeholder:</label>
        <input
          id="placeholderInput"
          type="text"
          name="placeholder"
          value={newField.placeholder}
          onChange={handleChange}
        />
      </div>
      <Button onClick={handleAddField} variant="contained">
        {editMode ? "Update" : "Add"}
      </Button>
    </div>
  );
}

export default FormGenerator;
