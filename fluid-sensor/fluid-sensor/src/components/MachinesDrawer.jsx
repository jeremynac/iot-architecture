import {
  Divider,
  Drawer,
  FormControlLabel,
  List,
  ListItem,
  ListItemButton,
  Switch
} from '@mui/material'
import React from 'react'

export const MachineDrawer = ({
  selectedMachineIndex,
  onChangeMachine,
  machines,
  onToggleRandomMode,
  isRandomMode,
  onToggleCompletelyRandomMode,
  isCompletelyRandomMode
}) => (
  <Drawer variant="persistent" anchor="left" open={true}>
    <Divider />
    <List>
      <ListItemButton
        onClick={() => onChangeMachine('machine1')}
        selected={selectedMachineIndex === 'machine1'}
      >
        {machines.machine1.label}
      </ListItemButton>
      <ListItemButton
        onClick={() => onChangeMachine('machine2')}
        selected={selectedMachineIndex === 'machine2'}
      >
        {machines.machine2.label}
      </ListItemButton>
      <ListItemButton
        onClick={() => onChangeMachine('machine3')}
        selected={selectedMachineIndex === 'machine3'}
      >
        {machines.machine3.label}
      </ListItemButton>

      <ListItem>
        <FormControlLabel
          control={
            <Switch
              onChange={(e) => onToggleRandomMode(e.target.checked)}
              checked={isRandomMode}
            />
          }
          label="Activate random mode (with valid values)"
        />
      </ListItem>
      <ListItem>
        <FormControlLabel
          control={
            <Switch
              onChange={(e) => onToggleCompletelyRandomMode(e.target.checked)}
              checked={isCompletelyRandomMode}
            />
          }
          label="Activate random mode (with any value)"
        />
      </ListItem>
    </List>
  </Drawer>
)
