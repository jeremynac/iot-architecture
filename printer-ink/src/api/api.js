import axios from 'axios'

export const consumeFluid = async (type, consumedVolume, totalVolume, capacity, totalConsumption) => {
    const result = await axios.post("http://localhost:4000/fluid", {
        type: type,
        totalVolume: totalVolume,
        consumedVolume: consumedVolume,
        thingsboardAccessToken:"NRjRAarZ1iulf4u4JsFI",// process.env.REACT_APP_THINGSBOARD_ACCESS_TOKEN,
        capacity: capacity, 
        totalConsumption: totalConsumption
    })
    console.log(result);
}

export const addFluid = async (type, totalVolume, capacity, totalConsumption) => {
    const result = await axios.post("http://localhost:4000/fluid", {
        type: type,
        totalVolume: totalVolume,
        consumedVolume: 0,
        thingsboardAccessToken:"NRjRAarZ1iulf4u4JsFI",// process.env.REACT_APP_THINGSBOARD_ACCESS_TOKEN,
        capacity: capacity, 
        totalConsumption: totalConsumption
    })
    console.log(result);
}