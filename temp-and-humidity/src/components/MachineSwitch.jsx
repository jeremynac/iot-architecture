import * as React from 'react'
import Box from '@mui/material/Box'
import { ToggleButton, Grid, FormControlLabel, Switch, Typography, Card, CardContent, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import ButtonBase from '@mui/material/ButtonBase'

export const MachineSwitch = ({
  onToggleRandomMode,
  isRandomMode,
  onToggleCompletelyRandomMode,
  isCompletelyRandomMode
}) => {
  return (
    <>
    <Card style={{ backgroundColor: '#1D1D1D' }} >
    <Grid
        container
        alignItems="center"
        justifyContent="center"
      >
          <Grid item xs={10}>

           <FormControlLabel
              control={
                <Switch

                  onChange={(e) => onToggleRandomMode(e.target.checked)}
                  checked={isRandomMode}
                />
              }
              label={
                <span style={{ color: 'white' }}>
                    Activate random mode (with valid values)
                </span>}
            />

        <FormControlLabel
          control={
            <Switch
              onChange={(e) => onToggleCompletelyRandomMode(e.target.checked)}
              checked={isCompletelyRandomMode}
            />
          }
          label={
            <span style={{ color: 'white' }}>
                Activate random mode (with any value)
            </span>}

        />
        </Grid>
        </Grid>
        </Card>
        </>

  )
}
