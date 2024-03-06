import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import FormGenerator from "../formGenerator/FormGenerator";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import style from "./formComponent.module.css";

export default function FormComponent({ form, setForm }) {
  

  const [fields, setFields] = useState([]);
  const [newField, setNewField] = useState({
    id: "",
    label: "",
    type: "text",
    placeholder: "",
  });

  const [selectedElement, setSelectedElement] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);

  const toggleRightDrawer = () => {
    setRightDrawerOpen(!rightDrawerOpen);
  };

  const handleElementChange = (event) => {
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
    <>
      <Drawer anchor="right" open={rightDrawerOpen} onClose={toggleRightDrawer}>
        <Box sx={{ width: 250 }}>
          <FormGenerator
            fields={fields}
            setFields={setFields}
            editMode={editMode}
            setEditMode={setEditMode}
            newField={newField}
            setNewField={setNewField}
            toggleRightDrawer={toggleRightDrawer}
            form={form}
            setForm={setForm}
            selectedElement={selectedElement}
          />
        </Box>
      </Drawer>

      <div>
        <h3>Create Form</h3>

        <Select
          value={selectedElement}
          onChange={handleElementChange}
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
    </>
  );
}
