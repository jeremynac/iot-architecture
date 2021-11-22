import { Box } from '@mui/system'
import React, { useState, useMemo } from 'react'
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
  const machines = {
    machine1: {
      label: 'Machine 1',
      token: process.env.REACT_APP_THINGSBOARD_FLUID_SENSOR_TOKEN_1,
      geolocation: {
        latitude: 48.864718,
        longitude: 2.349014
      }
    },
    machine2: {
      label: 'Machine 2',
      token: process.env.REACT_APP_THINGSBOARD_FLUID_SENSOR_TOKEN_2,
      geolocation: {
        latitude: 48.864716,
        longitude: 2.349014
      }
    },
    machine3: {
      label: 'Machine 3',
      token: process.env.REACT_APP_THINGSBOARD_FLUID_SENSOR_TOKEN_3,
      geolocation: {
        latitude: 48.864714,
        longitude: 2.349014
      }
    }
  }
  const [fluidType, setFluidType] = useState('water')
  const [selectedMachine, setSelectedMachine] = useState('machine1')
  const [water, setWater] = useState({
    machine1: defaultQuantities.water,
    machine2: defaultQuantities.water,
    machine3: defaultQuantities.water
  })
  const [fertilizer, setFertilizer] = useState({
    machine1: defaultQuantities.fertilizer,
    machine2: defaultQuantities.fertilizer,
    machine3: defaultQuantities.fertilizer
  })
  const [weedKiller, setWeedKiller] = useState({
    machine1: defaultQuantities.weedKiller,
    machine2: defaultQuantities.weedKiller,
    machine3: defaultQuantities.weedKiller
  })
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
          water[selectedMachine],
          fertilizer[selectedMachine],
          weedKiller[selectedMachine]
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
      addedVolume = defaultQuantities.water - water[selectedMachine]
      totalVolume = water[selectedMachine] + addedVolume
      capacity = defaultQuantities.water
      totalConsumption = defaultQuantities.water - totalVolume
      setWater({ ...water, [selectedMachine]: totalVolume })
    } else if (fluidType === 'fertilizer') {
      addedVolume = defaultQuantities.fertilizer - fertilizer[selectedMachine]
      totalVolume = fertilizer[selectedMachine] + addedVolume
      capacity = defaultQuantities.fertilizer
      totalConsumption = defaultQuantities.fertilizer - totalVolume
      setFertilizer({ ...fertilizer, [selectedMachine]: totalVolume })
    } else if (fluidType === 'weedKiller') {
      addedVolume = defaultQuantities.weedKiller - weedKiller[selectedMachine]
      totalVolume = weedKiller[selectedMachine] + addedVolume
      capacity = defaultQuantities.weedKiller
      totalConsumption = defaultQuantities.weedKiller - totalVolume
      setWeedKiller({ ...weedKiller, [selectedMachine]: totalVolume })
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
      consumedVolume =
        water[selectedMachine] >= 10 ? 10 : water[selectedMachine]
      totalVolume = water[selectedMachine] - consumedVolume
      capacity = defaultQuantities.water
      totalConsumption = defaultQuantities.water - totalVolume
      console.log('Test1')
      setWater({ ...water, [selectedMachine]: totalVolume })
    } else if (fluidType === 'fertilizer') {
      consumedVolume =
        fertilizer[selectedMachine] >= 10 ? 10 : fertilizer[selectedMachine]
      totalVolume = fertilizer[selectedMachine] - consumedVolume
      capacity = defaultQuantities.fertilizer
      totalConsumption = defaultQuantities.fertilizer - totalVolume
      console.log('Test2')
      setFertilizer({ ...fertilizer, [selectedMachine]: totalVolume })
    } else if (fluidType === 'weedKiller') {
      consumedVolume =
        weedKiller[selectedMachine] >= 10 ? 10 : weedKiller[selectedMachine]
      totalVolume = weedKiller[selectedMachine] - consumedVolume
      capacity = defaultQuantities.weedKiller
      totalConsumption = defaultQuantities.weedKiller - totalVolume
      console.log('Test3')
      setWeedKiller({ ...weedKiller, [selectedMachine]: totalVolume })
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
    console.log(water, fertilizer, weedKiller)
    switch (fluidType) {
      case 'water':
        return water[selectedMachine]
      case 'fertilizer':
        return fertilizer[selectedMachine]
      case 'weedKiller':
        return weedKiller[selectedMachine]
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
          water={water[selectedMachine]}
          fertilizer={fertilizer[selectedMachine]}
          weedKiller={weedKiller[selectedMachine]}
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
