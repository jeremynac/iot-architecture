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
        <Grid container spacing={1}>

          <Grid item xs={6}>
          <Typography variant="h5" component="div">
             Temperature
          </Typography>
            <Typography variant="h5" component="div">
              {temperature} °C
            </Typography>
          </Grid>
          <Grid item xs={6}>
          <Typography variant="h5" component="div">
             humidity levels
          </Typography>
            <Typography variant="h5" component="div">
              {humidity} °C
            </Typography>

          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
