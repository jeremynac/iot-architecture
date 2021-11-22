import { Grid } from '@mui/material'
import React, { useState } from 'react'
import { sendRandomData, updateTemperatureAndHumidity } from '../api/api'
import BasicCard from './BasicCard'
import { MachineDrawer } from './MachinesDrawer'
import BasicSlider from './BasicSlider'

const defaultQuantities = { temperature: 100, humidity: 100 }

export const Page = () => {
  const machines = [
    {
      label: 'Indoor Temperature Sensor 1',
      token: process.env.REACT_APP_THINGSBOARD_TEMPERATURE_SENSOR_INDOOR_1_TOKEN,
      geolocation: {
        latitude: 48.864718,
        longitude: 2.349014
      }
    },
    {
      label: 'Indoor Temperature Sensor 2',
      token: process.env.REACT_APP_THINGSBOARD_TEMPERATURE_SENSOR_INDOOR_2_TOKEN,
      geolocation: {
        latitude: 48.864716,
        longitude: 2.349014
      }
    },
    {
      label: 'Outdoor Temperature Sensor 1',
      token: process.env.REACT_APP_THINGSBOARD_TEMPERATURE_SENSOR_OUTDOOR_1_TOKEN,
      geolocation: {
        latitude: 48.864714,
        longitude: 2.349014
      }
    }
  ]
  const [selectedMachine, setSelectedMachine] = useState(0)
  const [randomMode, setRandomMode] = useState(false)
  const [completelyRandomMode, setCompletelyRandomMode] = useState(false)
  const [intervalId, setIntervalId] = useState()
  const [temperature, setTemperature] = useState(defaultQuantities.temperature)
  const [humidity, setHumidity] = useState(defaultQuantities.humidity)

  const onChangeTemperature = async (increasedTemperature) => {
    setTemperature(increasedTemperature)
    await updateTemperatureAndHumidity(increasedTemperature, humidity, machines[selectedMachine].geolocation.longitude, machines[selectedMachine].geolocation.latitude, machines[selectedMachine].token)
  }

  const onChangeHumidity = async (increasedHumidity) => {
    setHumidity(increasedHumidity)
    await updateTemperatureAndHumidity(temperature, increasedHumidity, machines[selectedMachine].geolocation.longitude, machines[selectedMachine].geolocation.latitude, machines[selectedMachine].token)
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

  return (
    <div>
      <MachineDrawer
        selectedMachineIndex={selectedMachine}
        onChangeMachine={setSelectedMachine}
        machines={machines}
        isRandomMode={randomMode}
        onToggleRandomMode={onToggleRandomMode}
        isCompletelyRandomMode={completelyRandomMode}
        onToggleCompletelyRandomMode={onToggleCompletelyRandomMode}
      />
      <Grid
      container
      spacing={0}
      alignItems="center"
      justifyContent="center"
      sx={{ ml: 50, width: 1000 }}
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={6}>
        <BasicSlider temperature={temperature} humidity={humidity} onChangeTemperature={onChangeTemperature} onChangeHumidity={onChangeHumidity} />

      </Grid>
    </Grid>
    </div>
  )
}
