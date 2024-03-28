import { useEffect } from "react";
import {
  Button,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Typography,
} from "@mui/material";

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
    <div style={{ width: 250, padding: 20, marginTop: 60 }}>
      <Typography variant="h5">Add Custom Field</Typography>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12}>
          <TextField
            size="small"
            label="Label"
            name="label"
            value={newField.label}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth size="small">
            <Select value={newField.type} onChange={handleChange} name="type">
              <MenuItem value="text">Text</MenuItem>
              <MenuItem value="number">Number</MenuItem>
              <MenuItem value="email">Email</MenuItem>
              <MenuItem value="file">Document attach</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            size="small"
            fullWidth
            label="Placeholder"
            name="placeholder"
            value={newField.placeholder}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Button
        onClick={handleAddField}
        variant="contained"
        fullWidth
        sx={{ mt: 2 }} // Add margin top
      >
        {editMode ? "Update" : "Add"}
      </Button>
    </div>
  );
}

export default FormGenerator;
