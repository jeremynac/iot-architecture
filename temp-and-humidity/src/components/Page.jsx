import { Divider, Grid, Box, Text } from '@mui/material'
import React, { useState } from 'react'
import { sendRandomData, updateTemperatureAndHumidity } from '../api/api'
import BasicCard from './BasicCard'
import { MachineDrawer } from './MachinesDrawer'
import BasicSlider from './BasicSlider'
import { MachineCard } from './MachineCard'
import { MachineSwitch } from './MachineSwitch'

import { Background } from './Background'
import { makeStyles } from '@material-ui/core/styles'
import '../App.scss'

const defaultQuantities = { temperature: 30, humidity: 100 }
const useStyles = makeStyles({
  root: {
    backgroundColor: 'black'
  }
})

export const Page = () => {
  const classes = useStyles()

  const machines = {
    machine1:
    {
      label: 'Indoor Temperature Sensor 1',
      token: process.env.REACT_APP_THINGSBOARD_TEMPERATURE_SENSOR_INDOOR_1_TOKEN,
      geolocation: {
        latitude: 48.864718,
        longitude: 2.349014
      }
    },
    machine2:
    {
      label: 'Indoor Temperature Sensor 2',
      token: process.env.REACT_APP_THINGSBOARD_TEMPERATURE_SENSOR_INDOOR_2_TOKEN,
      geolocation: {
        latitude: 48.864716,
        longitude: 2.349014
      }
    },
    machine3:
    {
      label: 'Outdoor Temperature Sensor 1',
      token: process.env.REACT_APP_THINGSBOARD_TEMPERATURE_SENSOR_OUTDOOR_1_TOKEN,
      geolocation: {
        latitude: 48.864714,
        longitude: 2.349014
      }
    }
  }
  const [selectedMachine, setSelectedMachine] = useState('machine1')
  const [randomMode, setRandomMode] = useState(false)
  const [completelyRandomMode, setCompletelyRandomMode] = useState(false)
  const [intervalId, setIntervalId] = useState()
  const [temperature, setTemperature] = useState({ machine1: defaultQuantities.temperature, machine2: defaultQuantities.temperature, machine3: defaultQuantities.temperature })
  const [humidity, setHumidity] = useState({ machine1: defaultQuantities.humidity, machine2: defaultQuantities.humidity, machine3: defaultQuantities.humidity })

  const onChangeTemperature = async (increasedTemperature) => {
    setTemperature({ ...temperature, [selectedMachine]: increasedTemperature })
  }

  const onUpdateServerTemperature = async (increasedTemperature) => {
    setTemperature({ ...temperature, [selectedMachine]: increasedTemperature })
    await updateTemperatureAndHumidity(increasedTemperature, humidity[selectedMachine], machines[selectedMachine].geolocation.longitude, machines[selectedMachine].geolocation.latitude, machines[selectedMachine].token)
  }

  const onChangeHumidity = async (increasedHumidity) => {
    setHumidity({ ...humidity, [selectedMachine]: increasedHumidity })
  }

  const onUpdateServerHumidity = async (increasedHumidity) => {
    setHumidity({ ...humidity, [selectedMachine]: increasedHumidity })
    await updateTemperatureAndHumidity(temperature[selectedMachine], increasedHumidity, machines[selectedMachine].geolocation.longitude, machines[selectedMachine].geolocation.latitude, machines[selectedMachine].token)
  }

  const sendData = async (
    validValues,
    machineToken
  ) => {
    await sendRandomData(
      validValues,
      machineToken
    )
  }

  const startRandomData = (validValues) => {
    const intervalID = setInterval(
      () =>
        sendData(
          validValues,
          machines[selectedMachine].token
        ),
      3000
    )
    setIntervalId(intervalID)
  }

  const stopRandomData = () => {
    clearInterval(intervalId)
  }

  const onToggleRandomMode = (value) => {
    if (value) {
      startRandomData(true)
    } else {
      stopRandomData()
    }
    setRandomMode(value)
  }

  const onToggleCompletelyRandomMode = (value) => {
    if (value) {
      startRandomData(false)
    } else {
      stopRandomData()
    }
    setCompletelyRandomMode(value)
  }
  const selectClassname = async () => {
    if (selectedMachine === 'machine1') {
      return 'lol'
    } else { return 'test' }
  }
  return (
    <div >
      <h1>{selectClassname}</h1>

      <Grid
        container
        classes={classes.paper }
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={3} >

         <MachineSwitch isRandomMode={randomMode}
            onToggleRandomMode={onToggleRandomMode}
            isCompletelyRandomMode={completelyRandomMode}
            onToggleCompletelyRandomMode={onToggleCompletelyRandomMode}/>
            </Grid>
            <Box sx={{ m: 4 }} />

        <Grid item xs={6} >
          <MachineCard
            selectedMachineIndex={selectedMachine}
            onChangeMachine={setSelectedMachine}
            machines={machines}
            isRandomMode={randomMode}
            onToggleRandomMode={onToggleRandomMode}
            isCompletelyRandomMode={completelyRandomMode}
            onToggleCompletelyRandomMode={onToggleCompletelyRandomMode}
          />
          <Box sx={{ m: 4 }} />

          <BasicSlider temperature={temperature[selectedMachine]} humidity={humidity[selectedMachine]} onChangeTemperature={onChangeTemperature} onChangeHumidity={onChangeHumidity} onUpdateServerHumidity={onUpdateServerHumidity} onUpdateServerTemperature={onUpdateServerTemperature} />

        </Grid>

      </Grid>
    </div>
  )
}
