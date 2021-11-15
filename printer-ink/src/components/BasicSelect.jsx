import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@material-ui/core/Button";

export default function BasicSelect({onConsume, onChangeFluidType, fluidType}) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Fluid type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={fluidType}
          label="Age"
          onChange={(event) => onChangeFluidType(event.target.value)}
        >
          <MenuItem value={"fertilizer"}>Fertilizer</MenuItem>
          <MenuItem value={"weedKiller"}>Weed Killer</MenuItem>
          <MenuItem value={"water"}>Water</MenuItem>
        </Select>
        <Box sx={{ mt: 1, ml: 20, mr: 20, mb: 3, width: 100 }}>
          <Button variant="contained" onClick={onConsume}>Consume</Button>
        </Box>
      </FormControl>
    </Box>
  );
}
