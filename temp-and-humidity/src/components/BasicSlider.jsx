import * as React from 'react'
import Box from '@mui/material/Box'
import { Slider, Grid, Typography, Card, CardContent } from '@mui/material'

const marks = [
  {
    value: 0,
    label: '0°C'
  },

  {
    value: 100,
    label: '100°C'
  }
]

function valuetext (value) {
  return `${value}°C`
}

export default function BasicSlider ({
  temperature,
  humidity,
  onChangeTemperature,
  onChangeHumidity
}) {
  return (
    <Card sx={{ minWidth: 275 }}>
    <CardContent>
    <Grid container spacing={5}>

    <Grid item xs={6}>
          <Typography variant="h5" component="div">
             Temperature
          </Typography>
            <Typography variant="h5" component="div">
              {temperature} °C
            </Typography>
          </Grid>
    <Grid item xs={6}>
      <Slider
          aria-label="Custom marks"
          onChange={(_, newValue) => onChangeTemperature(newValue)}
          defaultValue={20}
          getAriaValueText={valuetext}
          step={10}
          valueLabelDisplay="auto"
          marks={marks}
        />
    </Grid>
    <Grid item xs={6}>
          <Typography variant="h5" component="div">
             humidity levels
          </Typography>
            <Typography variant="h5" component="div">
              {humidity} °C
            </Typography>

    </Grid>
    <Grid item xs={6}>
      <Slider
          aria-label="Custom marks"
          onChange={(_, newValue) => onChangeHumidity(newValue)}
          defaultValue={20}
          getAriaValueText={valuetext}
          step={10}
          valueLabelDisplay="auto"
          marks={marks}
        />
    </Grid>

  </Grid>
  </CardContent>
    </Card>
  )
}
