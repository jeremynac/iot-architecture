import { Box } from '@mui/system'
import React, { useState } from 'react'
import BasicSelect from './BasicSelect'
import { addFluid, consumeFluid, sendRandomData } from '../api/api'
import { FluidGauges } from './FluidGauges'
import { MachineDrawer } from './MachinesDrawer'

const defaultQuantities = {
  fertilizer: 100,
  weedKiller: 100,
  water: 100
}

export const Page = () => {
  const machines = [
    {
      label: 'Machine 1',
      token: process.env.REACT_APP_THINGSBOARD_FLUID_SENSOR_TOKEN_1,
      geolocation: {
        latitude: 48.864718,
        longitude: 2.349014
      }
    },
    {
      label: 'Machine 2',
      token: process.env.REACT_APP_THINGSBOARD_FLUID_SENSOR_TOKEN_2,
      geolocation: {
        latitude: 48.864716,
        longitude: 2.349014
      }
    },
    {
      label: 'Machine 3',
      token: process.env.REACT_APP_THINGSBOARD_FLUID_SENSOR_TOKEN_3,
      geolocation: {
        latitude: 48.864714,
        longitude: 2.349014
      }
    }
  ]
  const [fluidType, setFluidType] = useState('water')
  const [selectedMachine, setSelectedMachine] = useState(0)
  const [water, setWater] = useState(defaultQuantities.water)
  const [fertilizer, setFertilizer] = useState(defaultQuantities.fertilizer)
  const [weedKiller, setWeedKiller] = useState(defaultQuantities.weedKiller)
  const [randomMode, setRandomMode] = useState(false)
  const [completelyRandomMode, setCompletelyRandomMode] = useState(false)
  const [intervalId, setIntervalId] = useState()

  const sendData = async (
    validValues,
    machineToken,
    waterVolume,
    fertilizerVolume,
    weedKillerVolume
  ) => {
    console.log(randomMode)
    await sendRandomData(
      validValues,
      machineToken,
      waterVolume,
      fertilizerVolume,
      weedKillerVolume
    )
  }

  const startRandomData = (validValues) => {
    const intervalID = setInterval(
      () =>
        sendData(
          validValues,
          machines[selectedMachine].token,
          water,
          fertilizer,
          weedKiller
        ),
      3000
    )
    setIntervalId(intervalID)
  }

  const stopRandomData = () => {
    clearInterval(intervalId)
  }

  const onAddFluid = () => {
    let totalVolume
    let addedVolume = 10
    let capacity
    let totalConsumption
    if (fluidType === 'water') {
      addedVolume = defaultQuantities.water - water
      totalVolume = water + addedVolume
      capacity = defaultQuantities.water
      totalConsumption = defaultQuantities.water - totalVolume
      setWater(totalVolume)
    } else if (fluidType === 'fertilizer') {
      addedVolume = defaultQuantities.fertilizer - fertilizer
      totalVolume = fertilizer + addedVolume
      capacity = defaultQuantities.fertilizer
      totalConsumption = defaultQuantities.fertilizer - totalVolume
      setFertilizer(totalVolume)
    } else if (fluidType === 'weedKiller') {
      addedVolume = defaultQuantities.weedKiller - weedKiller
      totalVolume = weedKiller + addedVolume
      capacity = defaultQuantities.weedKiller
      totalConsumption = defaultQuantities.weedKiller - totalVolume
      setWeedKiller(totalVolume)
    } else {
      return
    }
    addFluid(
      fluidType,
      totalVolume,
      capacity,
      totalConsumption,
      machines[selectedMachine].geolocation.longitude,
      machines[selectedMachine].geolocation.latitude,
      machines[selectedMachine].token
    )
  }

  const onConsume = () => {
    let totalVolume
    let consumedVolume
    let capacity
    let totalConsumption
    if (fluidType === 'water') {
      consumedVolume = water >= 10 ? 10 : water
      totalVolume = water - consumedVolume
      capacity = defaultQuantities.water
      totalConsumption = defaultQuantities.water - totalVolume
      setWater(totalVolume)
    } else if (fluidType === 'fertilizer') {
      consumedVolume = fertilizer >= 10 ? 10 : fertilizer
      totalVolume = fertilizer - consumedVolume
      capacity = defaultQuantities.fertilizer
      totalConsumption = defaultQuantities.fertilizer - totalVolume
      setFertilizer(totalVolume)
    } else if (fluidType === 'weedKiller') {
      consumedVolume = weedKiller >= 10 ? 10 : weedKiller
      totalVolume = weedKiller - consumedVolume
      capacity = defaultQuantities.weedKiller
      totalConsumption = defaultQuantities.weedKiller - totalVolume
      setWeedKiller(totalVolume)
    } else {
      return
    }
    consumeFluid(
      fluidType,
      consumedVolume,
      totalVolume,
      capacity,
      totalConsumption,
      machines[selectedMachine].geolocation.longitude,
      machines[selectedMachine].geolocation.latitude,
      machines[selectedMachine].token
    )
  }

  const getCurrentFluidQuantity = () => {
    switch (fluidType) {
      case 'water':
        return water
      case 'fertilizer':
        return fertilizer
      case 'weedKiller':
        return weedKiller
      default:
        return undefined
    }
  }

  const getCurrentFluidColor = () => {
    switch (fluidType) {
      case 'water':
        return 'blue'
      case 'fertilizer':
        return 'green'
      case 'weedKiller':
        return 'red'
      default:
        return undefined
    }
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
    <div className="App">
      <MachineDrawer
        selectedMachineIndex={selectedMachine}
        onChangeMachine={setSelectedMachine}
        machines={machines}
        isRandomMode={randomMode}
        onToggleRandomMode={onToggleRandomMode}
        isCompletelyRandomMode={completelyRandomMode}
        onToggleCompletelyRandomMode={onToggleCompletelyRandomMode}
      />
      <Box sx={{ mt: 20, ml: 50, mr: 20, mb: 3, maxWidth: 1000 }}>
        <FluidGauges
          water={water}
          fertilizer={fertilizer}
          weedKiller={weedKiller}
        />
      </Box>
      <Box
        sx={{
          mt: 10,
          ml: 50,
          mr: 20,
          mb: 3,
          maxWidth: 1000,
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <BasicSelect
          onChangeFluidType={setFluidType}
          fluidType={fluidType}
          onConsume={onConsume}
          onAddFluid={onAddFluid}
          fluidQuantity={getCurrentFluidQuantity()}
          selectedFluidColor={getCurrentFluidColor()}
        />
      </Box>
    </div>
  )
}
