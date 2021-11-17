import { Box } from "@mui/system"
import { useState } from "react";
import BasicSelect from "./BasicSelect"
import { Table } from "./Table"
import {addFluid, consumeFluid} from '../api/api'

const defaultQuantities = { fertilizer: 100 ,
    weedKiller : 100,
    water: 100 };
export const Page = () => {
    const [fluidType, setFluidType] = useState("");
    const [water, setWater] = useState(defaultQuantities.water);
    const [fertilizer, setFertilizer] = useState(defaultQuantities.fertilizer);
    const [weedKiller, setWeedKiller] = useState(defaultQuantities.weedKiller);

    const onAddFluid = () => {
      let totalVolume;
        let addedVolume = 10;
        let capacity;
        let totalConsumption;
        if (fluidType === "water") {
            addedVolume = defaultQuantities.water - water;
            totalVolume = water + addedVolume;
            capacity = defaultQuantities.water;
            totalConsumption = defaultQuantities.water - totalVolume;
            setWater(totalVolume)
        } else if (fluidType === "fertilizer") {
            addedVolume = defaultQuantities.fertilizer - fertilizer;
            totalVolume = fertilizer + addedVolume;
            capacity = defaultQuantities.fertilizer;
            totalConsumption = defaultQuantities.fertilizer - totalVolume;
            setFertilizer(totalVolume)
        } else if (fluidType === "weedKiller") {
            addedVolume = defaultQuantities.weedKiller - weedKiller;
            totalVolume = weedKiller + addedVolume;
            capacity = defaultQuantities.weedKiller;
            totalConsumption = defaultQuantities.weedKiller - totalVolume;
            setWeedKiller(totalVolume)
        } else {
          return;
        }
        addFluid(fluidType, totalVolume, capacity, totalConsumption);
    }
    
    const onConsume = () => {
        let totalVolume;
        let consumedVolume;
        let capacity;
        let totalConsumption;
        if (fluidType === "water") {
            consumedVolume = water >= 10 ? 10 : water;
            totalVolume = water - consumedVolume;
            capacity = defaultQuantities.water;
            totalConsumption = defaultQuantities.water - totalVolume;
            setWater(totalVolume)
        } else if (fluidType === "fertilizer") {
            consumedVolume = fertilizer >= 10 ? 10 : fertilizer;
            totalVolume = fertilizer - consumedVolume;
            capacity = defaultQuantities.fertilizer;
            totalConsumption = defaultQuantities.fertilizer - totalVolume;
            setFertilizer(totalVolume)
        } else if (fluidType === "weedKiller") {
            consumedVolume = weedKiller >= 10 ? 10 : weedKiller;
            totalVolume = weedKiller - consumedVolume;
            capacity = defaultQuantities.weedKiller;
            totalConsumption = defaultQuantities.weedKiller - totalVolume;
            setWeedKiller(totalVolume)
        } else {
          return;
        }
        consumeFluid(fluidType, consumedVolume, totalVolume, capacity, totalConsumption);
    }

    const getCurrentFluidQuantity = () => {
      switch(fluidType) {
        case "water":
          return water;
        case "fertilizer":
          return fertilizer;
        case "weedKiller":
          return weedKiller;
        default:
          return undefined
      }
    }

    return <div className="App">
      <Box sx={{ mt: 20, ml: 20, mr: 20, mb: 3, width: 400 }}>
        <Table water={water} fertilizer={fertilizer} weedKiller={weedKiller}/>
      </Box>
      <Box sx={{ mt: 1, ml: 20, mr: 20, mb: 3, width: 400 }}>
        <BasicSelect onChangeFluidType={setFluidType} fluidType={fluidType} onConsume={onConsume} onAddFluid={onAddFluid} fluidQuantity={getCurrentFluidQuantity()}/>
      </Box>
    </div>
}