import * as React from 'react'
import Box from '@mui/material/Box'
import { ToggleButton, Grid, FormControlLabel, Switch, Typography, Card, CardContent, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import ButtonBase from '@mui/material/ButtonBase'

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.7
    },
    '& .MuiImageMarked-root': {
      opacity: 0
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor'
    }
  }
}))

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%'
})

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white
}))

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity')
}))

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity')
}))

export const MachineCard = ({
  selectedMachineIndex,
  onChangeMachine,
  machines,
  onToggleRandomMode,
  isRandomMode,
  onToggleCompletelyRandomMode,
  isCompletelyRandomMode
}) => {
  return (

<>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
        <ImageButton
          focusRipple
          style={{
            width: '33.33%'
          }}
          onClick={() => onChangeMachine('machine1')}
          onSelected={selectedMachineIndex === 'machine1'}
        >
          <ImageSrc style={{ backgroundImage: 'url(https://d1af89beukha9h.cloudfront.net/wp-content/uploads/2018/02/Global-Grow-Tents-Market-2-1024x926.jpg)' }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`
              }}
            >
              {machines.machine1.label}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
        <ImageButton
          focusRipple
          style={{
            width: '33.33%'
          }}
          onClick={() => onChangeMachine('machine2')}
          selected={selectedMachineIndex === 'machine2'}
        >
          <ImageSrc style={{ backgroundImage: 'url(https://static.tildacdn.com/tild3963-3061-4532-b563-623364656663/1-2-3.jpg)' }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`
              }}
            >
              {machines.machine2.label}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
        <ImageButton
          focusRipple
          style={{
            width: '33.33%'
          }}
          onClick={() => onChangeMachine('machine3')}
          selected={selectedMachineIndex === 'machine3'}
        >
          <ImageSrc style={{ backgroundImage: 'url(\'https://gremonsystems.com/wp-content/uploads/2019/10/1.k%C3%A9p_Irrigation-system-on-a-vegetable-farm.jpg\')' }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`
              }}
            >
              {machines.machine3.label}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
    </Box>

        </>

  )
}
