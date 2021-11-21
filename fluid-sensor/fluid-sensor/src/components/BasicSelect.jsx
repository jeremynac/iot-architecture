import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import { Button, NativeSelect } from '@mui/material'

export default function BasicSelect ({
  onConsume,
  onChangeFluidType,
  onAddFluid,
  fluidType,
  fluidQuantity,
  selectedFluidColor
}) {
  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel>Fluid type</InputLabel>
        <NativeSelect
          // labelId="demo-simple-select-label"
          // id="demo-simple-select"
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
          value={fluidType}
          label="Fluid type"
          onChange={(event) => onChangeFluidType(event.target.value)}
        >
          <option value={'water'}>Water</option>
          <option value={'fertilizer'}>Fertilizer</option>
          <option value={'weedKiller'}>Weed Killer</option>
        </NativeSelect>
        <Box sx={{ mt: 1, display: 'flex' }}>
          {fluidQuantity < 100 && (
            <Box sx={{ mr: 1 }}>
              <Button
                variant="outlined"
                onClick={onAddFluid}
                style={{
                  color: selectedFluidColor,
                  borderColor: selectedFluidColor
                }}
              >
                Refill
              </Button>
            </Box>
          )}
          {fluidQuantity > 0 && (
            <Box>
              <Button
                variant="contained"
                onClick={onConsume}
                style={{ background: selectedFluidColor }}
                // color={selectedFluidColor}
              >
                Consume
              </Button>
            </Box>
          )}
        </Box>
      </FormControl>
    </Box>
  )
}
