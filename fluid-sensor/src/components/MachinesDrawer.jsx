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
    {/* <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr'
              ? (
              <ChevronLeftIcon />
                )
              : (
              <ChevronRightIcon />
                )}
          </IconButton>
        </DrawerHeader> */}
    <Divider />
    <List>
      <ListItemButton
        onClick={() => onChangeMachine(0)}
        selected={selectedMachineIndex === 0}
      >
        {machines[0].label}
      </ListItemButton>
      <ListItemButton
        onClick={() => onChangeMachine(1)}
        selected={selectedMachineIndex === 1}
      >
        {machines[1].label}
      </ListItemButton>
      <ListItemButton
        onClick={() => onChangeMachine(2)}
        selected={selectedMachineIndex === 2}
      >
        {machines[2].label}
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
