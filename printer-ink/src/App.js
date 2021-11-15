import "./App.css";
import Table from "./components/Table";
import BasicSelect from "./components/BasicSelect";
import Box from "@mui/material/Box";

function App() {
  return (
    <div className="App">
      <Box sx={{ mt: 20, ml: 20, mr: 20, mb: 3, width: 400 }}>
        <Table />
      </Box>
      <Box sx={{ mt: 1, ml: 20, mr: 20, mb: 3, width: 400 }}>
        <BasicSelect />
      </Box>
    </div>
  );
}

export default App;
