import * as React from "react";
import Paper from "@material-ui/core/Paper";

import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";
export const Table = ({water, fertilizer, weedKiller}) =>  {
  const data = React.useMemo(() => [
    { colorName: "Water", amount: water },
    { colorName: "Fertilizer", amount: fertilizer },
    { colorName: "Weed killer", amount: weedKiller },
  ], [water, fertilizer, weedKiller]);
    return (
      <Paper>
        <Chart data={data}>
          <ArgumentAxis />
          <ValueAxis max={100} />
          <BarSeries
            valueField="amount"
            argumentField="colorName"
            color="color"
          />
          <Title text="Printer levels" />
          <Animation />
        </Chart>
      </Paper>
    );
    }
