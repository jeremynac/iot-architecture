import { Box } from "@mui/system"
import { useState } from "react";
import BasicSelect from "./BasicSelect"
import { Table } from "./Table"
import {consumeFluid} from '../api/api'

const defaultQuantities = { fertilizer: 100 ,
    weedKiller : 100,
    water: 100 };
export const Page = () => {
    const [fluidType, setFluidType] = useState("");
    const [water, setWater] = useState(defaultQuantities.water);
    const [fertilizer, setFertilizer] = useState(defaultQuantities.fertilizer);
    const [weedKiller, setWeedKiller] = useState(defaultQuantities.weedKiller);
    
    const onConsume = () => {
      console.log("Consume")
        let totalVolume;
        let consumedVolume;
        if (fluidType === "water") {
            consumedVolume = water >= 10 ? 10 : water;
            totalVolume = water - consumedVolume;
            setWater(totalVolume)
        } else if (fluidType === "fertilizer") {
            consumedVolume = fertilizer >= 10 ? 10 : fertilizer;
            totalVolume = fertilizer - consumedVolume;
            setFertilizer(totalVolume)
        } else if (fluidType === "weedKiller") {
            consumedVolume = weedKiller >= 10 ? 10 : weedKiller;
            totalVolume = weedKiller - consumedVolume;
            setWeedKiller(totalVolume)
        } else {
          return;
        }
        consumeFluid(fluidType, consumedVolume, totalVolume)
    }
    return <div className="App">
      <Box sx={{ mt: 20, ml: 20, mr: 20, mb: 3, width: 400 }}>
        <Table water={water} fertilizer={fertilizer} weedKiller={weedKiller}/>
      </Box>
      <Box sx={{ mt: 1, ml: 20, mr: 20, mb: 3, width: 400 }}>
        <BasicSelect onChangeFluidType={setFluidType} fluidType={fluidType} onConsume={onConsume}/>
      </Box>
    </div>
}