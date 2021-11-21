import * as React from 'react'
import Paper from '@material-ui/core/Paper'

import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis
} from '@devexpress/dx-react-chart-material-ui'
import { Animation } from '@devexpress/dx-react-chart'
export const Table = ({ water, fertilizer, weedKiller }) => {
  const data = React.useMemo(
    () => [
      { fluidType: 'Water', waterAmount: water },
      { fluidType: 'Fertilizer', fertlizerAmount: fertilizer },
      { fluidType: 'Weed killer', weedKillerAmount: weedKiller }
    ],
    [water, fertilizer, weedKiller]
  )
  return (
    <Paper>
      <Chart data={data}>
        <ArgumentAxis />
        <ValueAxis max={100} />
        <BarSeries
          valueField="waterAmount"
          argumentField="fluidType"
          color="blue"
        />
        <BarSeries
          valueField="fertlizerAmount"
          argumentField="fluidType"
          color="green"
        />
        <BarSeries
          valueField="weedKillerAmount"
          argumentField="fluidType"
          color="red"
        />
        <Title text="Fluids quantity" />
        <Animation />
      </Chart>
    </Paper>
  )
}
