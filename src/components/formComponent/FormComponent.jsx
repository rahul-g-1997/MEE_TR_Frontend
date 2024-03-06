import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import FormGenerator from "../formGenerator/FormGenerator";
import FormView from "../formView/FormView";
import Box from "@mui/material/Box";

export default function FormComponent() {
  const [form, setForm] = useState([
    { Element: "Context", Indicator: [] },
    { Element: "Planning", Indicator: [] },
    { Element: "Input", Indicator: [] },
    { Element: "Process", Indicator: [] },
    { Element: "Output", Indicator: [] },
    { Element: "Outcome", Indicator: [] },
  ]);

  const [fields, setFields] = useState([]);
  const [newField, setNewField] = useState({
    id: "",
    label: "",
    type: "text",
    placeholder: "",
  });

  const [selectedElement, setSelectedElement] = useState("");

  const handleElement = (event) => {
    console.log(form);
  };

  const [editMode, setEditMode] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);

  const toggleRightDrawer = () => {
    setRightDrawerOpen(!rightDrawerOpen);
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

      <FormView
        fields={fields}
        setNewField={setNewField}
        setFields={setFields}
        setEditMode={setEditMode}
        toggleRightDrawer={toggleRightDrawer}
        handleElement={handleElement}
        form={form}
        selectedElement={selectedElement}
        setSelectedElement={setSelectedElement}
      />
    </>
  );
}
