import Button from "@mui/material/Button";
import style from "./formView.module.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function FormView({
  fields,
  setNewField,
  setEditMode,
  setFields,
  toggleRightDrawer,
  form,
  selectedElement,
  setSelectedElement,
}) {
  const handleElement = (event) => {
    setSelectedElement(event.target.value);
  };

  const handleEditField = (field) => {
    setNewField({ ...field });
    setEditMode(true);
    toggleRightDrawer();
  };

  const handleDeleteField = (id) => {
    const updatedFields = fields.filter((field) => field.id !== id);
    setFields(updatedFields);
  };

  return (
    <div>
      <h3>Create Form</h3>

      <Select
        value={selectedElement}
        onChange={handleElement}
        displayEmpty
        fullWidth
        size="small"
        labelId="demo-select-small-label"
        id="demo-select-small"
      >
        <MenuItem value="" disabled>
          Select Element
        </MenuItem>
        <MenuItem value="Context">Context</MenuItem>
        <MenuItem value="Planning">Planning</MenuItem>
        <MenuItem value="Input">Input</MenuItem>
        <MenuItem value="Process">Process</MenuItem>
        <MenuItem value="Output">Output</MenuItem>
        <MenuItem value="Outcome">Outcome</MenuItem>
      </Select>

      {/* Display elements from the form state */}
      <ol type={"1"}>
        {form.find((item) => item.Element === selectedElement) && (
          <li>
            {selectedElement}
            <Button onClick={toggleRightDrawer}>Add field</Button>
          </li>
        )}
      </ol>

      
      {fields.map((field) => (
        <div key={field.id} className={style.container}>
          <label>{field.label}:</label>
          <input type={field.type} placeholder={field.placeholder} />
          <Button onClick={() => handleEditField(field)} variant="contained">
            Edit
          </Button>
          <Button
            onClick={() => handleDeleteField(field.id)}
            variant="contained"
          >
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
}
