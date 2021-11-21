import axios from 'axios'
export const updateTemperatureAndHumidity = async (temperature, humidity, longitude, latitude, machineToken) => {
  const result = await axios.post(`${process.env.REACT_APP_THINGSBOARD_URL}/api/v1/${machineToken}/telemetry`, {
    temperature: temperature,
    humidity: humidity,
    longitude: longitude,
    latitude: latitude
  })
  console.log(result)
}

function getRandomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

function getRandomTemperature (validValues) {
  return validValues ? getRandomInt(0, 100) : getRandomInt(-100000, 100000)
}

function getRandomHumidity (validValues) {
  return validValues ? getRandomInt(0, 100) : getRandomInt(-100000, 100000)
}

function getRandomLongitude (validValues) {
  return validValues ? getRandomInt(-180, 180) : getRandomInt(-10000, 10000)
}

function getRandomLatitude (validValues) {
  return validValues ? getRandomInt(-90, 90) : getRandomInt(-10000, 10000)
}

function getRandomData (validValues) {
  const randomTemperature = getRandomTemperature(validValues)
  const randomHumidity = getRandomHumidity(validValues)
  const longitude = getRandomLongitude(validValues)
  const latitude = getRandomLatitude(validValues)
  return {
    temperature: randomTemperature,
    humidity: randomHumidity,
    longitude,
    latitude
  }
}

export const sendRandomData = async (validValues, machineToken) => {
  const randomData = getRandomData(validValues)
  await updateTemperatureAndHumidity(validValues, machineToken)
}
