import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@material-ui/core/Button";

export default function BasicSelect() {
  const [fluid, setFluid] = React.useState("");

  const handleChange = (event) => {
    setFluid(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Fluid type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={fluid}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={1}>Fertilizer</MenuItem>
          <MenuItem value={2}>Weed Killer</MenuItem>
          <MenuItem value={3}>Water</MenuItem>
        </Select>
        <Box sx={{ mt: 1, ml: 20, mr: 20, mb: 3, width: 100 }}>
          <Button variant="contained">Consume</Button>
        </Box>
      </FormControl>
    </Box>
  );
}
