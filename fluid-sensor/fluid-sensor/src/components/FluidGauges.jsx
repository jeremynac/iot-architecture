import { FluidGauge } from './FluidGauge'
import React from 'react'
import { Grid, Typography } from '@mui/material'

export const FluidGauges = ({ water, fertilizer, weedKiller }) => {
  return (
    <Grid container>
      <Grid item xs={4}>
        <FluidGauge fluidAmount={water} fillColor="blue" />
        <Typography>Water</Typography>
      </Grid>
      <Grid item xs={4}>
        <FluidGauge fluidAmount={fertilizer} fillColor="green" />
        <Typography>Fertlizer</Typography>
      </Grid>
      <Grid item xs={4}>
        <FluidGauge fluidAmount={weedKiller} fillColor="red" />
        <Typography>Weed Killer</Typography>
      </Grid>
    </Grid>
  )
}
