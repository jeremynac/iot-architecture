import { Grid } from "@mui/material";
import BasicCard from "./BasicCard";

export const Page = () => {
  return (
    <Grid
      container
      spacing={0}
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={5}>
        <BasicCard />
      </Grid>
    </Grid>
  );
};
