import { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";

export default function UserFormView({ form }) {
  // Initialize data with empty values for 'Indicator' fields
  const [data, setData] = useState([
    { Element: "Context", Indicator: [] },
    { Element: "Planning", Indicator: [] },
    { Element: "Input", Indicator: [] },
    { Element: "Process", Indicator: [] },
    { Element: "Output", Indicator: [] },
    { Element: "Outcome", Indicator: [] },
  ]);

  // Function to handle changes in input fields
  const handleChange = (elementIndex, indicatorIndex, newValue) => {
    const updatedData = [...data];
    updatedData[elementIndex].Indicator[indicatorIndex].value = newValue;
    setData(updatedData);
  };

  // Function to handle saving data for an indicator
  const handleSave = () => {
    console.log("Saving data:", data);
    // You can add logic here to save data to a database or perform other actions
  };

  return (
    <div>
      {form.map((element, elementIndex) => (
        <div key={elementIndex}>
          {element.Element}
          {element.Indicator.map((indicator, indicatorIndex) => (
            <Grid container spacing={2} key={indicator.id} alignItems="center">
              <Grid item xs={2}>
                <TextField
                  label={indicator.label}
                  size="small"
                  value={indicator.value}
                  onChange={(e) =>
                    handleChange(elementIndex, indicatorIndex, e.target.value)
                  }
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    handleSave(elementIndex, indicatorIndex, indicator.value)
                  }
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          ))}
        </div>
      ))}
    </div>
  );
}
