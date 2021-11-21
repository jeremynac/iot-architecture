import * as React from 'react'
import { useState } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import { IconButton, Button, Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

export default function BasicCard ({ temperature, humidity, onIncreaseTemperature, onReduceTemperature }) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <IconButton onClick={onReduceTemperature}>
              <ArrowBackIosIcon />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h5" component="div">
              {temperature}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <IconButton onClick={onIncreaseTemperature}>
              <ArrowForwardIosIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
