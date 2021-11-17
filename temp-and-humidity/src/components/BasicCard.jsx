import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { IconButton, Button, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const defaultQuantities = { water: 100 };
export default function BasicCard() {
  const [water, setWater] = useState(defaultQuantities.water);

  const onIncreaseTemp = () => {
    let totalVolume;
    let addedVolume = 10;
    totalVolume = water + addedVolume;

    setWater(totalVolume);
  };
  const onReduceTemp = () => {
    let totalVolume;
    let reduceVolume = 10;
    totalVolume = water - reduceVolume;
    setWater(totalVolume);
  };
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <IconButton onClick={onReduceTemp}>
              <ArrowBackIosIcon />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h5" component="div">
              {water}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <IconButton onClick={onIncreaseTemp}>
              <ArrowForwardIosIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
