import axios from 'axios'

export const consumeFluid = async (type, consumedVolume, totalVolume, capacity, totalConsumption, longitude, latitude, machineToken) => {
  const result = await axios.post('http://localhost:4000/fluid', {
    type: type,
    totalVolume: totalVolume,
    consumedVolume: consumedVolume,
    thingsboardAccessToken: machineToken,
    capacity: capacity,
    totalConsumption: totalConsumption,
    longitude: longitude,
    latitude: latitude
  })
  console.log(result)
}

export const addFluid = async (type, totalVolume, capacity, totalConsumption, machineToken) => {
  const result = await axios.post('http://localhost:4000/fluid', {
    type: type,
    totalVolume: totalVolume,
    consumedVolume: 0,
    thingsboardAccessToken: machineToken,
    capacity: capacity,
    totalConsumption: totalConsumption
  })
  console.log(result)
}

function getRandomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
}

function getRandomTotalConsumption (validValues, capacity, totalVolume) {
  return validValues ? capacity - totalVolume : getRandomInt(-100000, 100000)
}

function getRandomCapacity (validValues) {
  return validValues ? getRandomInt(0, 100) : getRandomInt(-100000, 100000)
}

function getRandomTotalVolume (validValues, consumedVolume, capacity) {
  return validValues ? getRandomInt(0, capacity - consumedVolume) : getRandomInt(-100000, 100000)
}

function getRandomConsumedVolume (validValues, currentVolume, capacity) {
  return validValues ? getRandomInt(0, Math.min(currentVolume, capacity)) : getRandomInt(-100000, 100000)
}

function getRandomType (validValues) {
  const types = validValues ? ['water', 'fertilizer', 'weedKiller'] : ['water', 'fertilizer', 'weedKiller', 'something', 'WeedFertilizer', 'Orange juice']
  const randomTypeIndex = getRandomInt(0, types.length)
  const randomType = types[randomTypeIndex]
  return randomType
}

function getRandomLongitude (validValues) {
  return validValues ? getRandomInt(-180, 180) : getRandomInt(-10000, 10000)
}

function getRandomLatitude (validValues) {
  return validValues ? getRandomInt(-90, 90) : getRandomInt(-10000, 10000)
}

function getRandomData (currentWaterVolume, currentFertilizerVolume, currentWeedKillerVolume, validValues) {
  const type = getRandomType(validValues)
  const capacity = getRandomCapacity(validValues)
  const currentVolume = type === 'water' ? currentWaterVolume : type === 'fertilizer' ? currentFertilizerVolume : type === 'weedKiller' ? currentWeedKillerVolume : 0
  const consumedVolume = getRandomConsumedVolume(validValues, currentVolume, capacity)
  const totalVolume = getRandomTotalVolume(validValues, consumedVolume, capacity)
  const totalConsumption = getRandomTotalConsumption(validValues, capacity, totalVolume)
  const longitude = getRandomLongitude(validValues)
  const latitude = getRandomLatitude(validValues)
  return {
    type,
    capacity,
    consumedVolume,
    totalVolume,
    totalConsumption,
    longitude,
    latitude
  }
}

export const sendRandomData = async (validValues, machineToken, currentWaterVolume, currentFertilizerVolume, currentWeedKillerVolume) => {
  const randomData = getRandomData(currentWaterVolume, currentFertilizerVolume, currentWeedKillerVolume, validValues)
  await consumeFluid(randomData.type, randomData.consumedVolume, randomData.totalVolume, randomData.capacity, randomData.totalConsumption, randomData.longitude, randomData.latitude, machineToken)
}
