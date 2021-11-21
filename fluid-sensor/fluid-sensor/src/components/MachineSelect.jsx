import React from 'react'
import { FormControl, InputLabel, NativeSelect } from '@mui/material'
import { Box } from '@mui/system'

export const MachineSelect = ({
  selectedMachineIndex,
  selectedMachineLabel,
  onChangeMachine
}) => (
  <Box>
    <FormControl fullWidth>
      <InputLabel>Select the machine</InputLabel>
      <NativeSelect
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left'
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left'
          },
          getContentAnchorEl: null
        }}
        value={selectedMachineIndex}
        label="Fluid type"
        onChange={(event) => onChangeMachine(event.target.value)}
      >
        <option value={1}>Machine 1</option>
        <option value={2}>Machine 2</option>
        <option value={3}>Machine 3</option>
      </NativeSelect>
    </FormControl>
  </Box>
)
