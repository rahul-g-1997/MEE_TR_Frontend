import { useState } from "react";
import { Grid, TextField, IconButton, Tooltip } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import FormGenerator from "../formGenerator/FormGenerator";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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

        {form.map((element, index) => (
          <div key={index} onClick={() => setSelectedElement(element.Element)}>
            {element.Element}
            {element.Indicator.map((indicator) => (
              <Grid
                container
                spacing={2}
                key={indicator.id}
                alignItems="center"
              >
                <Grid item xs={2}>
                  <TextField
                    label={indicator.label}
                    size="small"
                    value={indicator.value} 
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton
                    onClick={() => handleEditField(indicator)}
                    aria-label="Edit"
                    color="primary"
                  >
                    <Tooltip title="Edit">
                      <EditIcon />
                    </Tooltip>
                  </IconButton>
                </Grid>
                <Grid item xs={2}>
                  <IconButton
                    onClick={() => handleDeleteField(indicator.id)}
                    aria-label="Delete"
                    color="secondary"
                  >
                    <Tooltip title="Delete">
                      <DeleteIcon />
                    </Tooltip>
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            <Tooltip title="Add field">
              <IconButton
                onClick={() => {
                  setSelectedElement(element.Element);
                  toggleRightDrawer();
                }}
                aria-label="Add field"
                sx={{ mt: 2 }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          </div>
        ))}
      </div>
    </>
  );
}
