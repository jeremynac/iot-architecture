import { Grid } from '@mui/material'
import React, { useState } from 'react'
import { sendRandomData, updateTemperatureAndHumidity } from '../api/api'
import BasicCard from './BasicCard'
import { MachineDrawer } from './MachinesDrawer'

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

  const onIncreaseTemperature = async () => {
    const increaseAmount = 10
    const increasedTemperature = temperature + increaseAmount
    setTemperature(increasedTemperature)
    await updateTemperatureAndHumidity(increasedTemperature, humidity, machines[selectedMachine].geolocation.longitude, machines[selectedMachine].geolocation.latitude, machines[selectedMachine].token)
  }
  const onReduceTemperature = async () => {
    const reduceAmount = temperature - 10 < -273.5 ? temperature + 273.5 : 10
    const reducedTemperature = temperature - reduceAmount
    setTemperature(reducedTemperature)
    await updateTemperatureAndHumidity(reducedTemperature, humidity, machines[selectedMachine].geolocation.longitude, machines[selectedMachine].geolocation.latitude, machines[selectedMachine].token)
  }

  const onIncreaseHumidity = async () => {
    const increaseAmount = 10
    const increasedHumidity = humidity + increaseAmount
    setHumidity(increasedHumidity)
    await updateTemperatureAndHumidity(temperature, increasedHumidity, machines[selectedMachine].geolocation.longitude, machines[selectedMachine].geolocation.latitude, machines[selectedMachine].token)
  }
  const onReduceHumidity = async () => {
    const reduceAmount = 10
    const reducedHumidity = humidity - reduceAmount
    setHumidity(reducedHumidity)
    await updateTemperatureAndHumidity(temperature, reducedHumidity, machines[selectedMachine].geolocation.longitude, machines[selectedMachine].geolocation.latitude, machines[selectedMachine].token)
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
      <Grid item xs={5}>
        <BasicCard temperature={temperature} humidity={humidity} onIncreaseTemperature={onIncreaseTemperature} onReduceTemperature={onReduceTemperature} onIncreaseHumidity={onIncreaseHumidity} onReduceHumidity={onReduceHumidity}/>
      </Grid>
    </Grid>
    </div>
  )
}
