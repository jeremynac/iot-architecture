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

const data = [
  { colorName: "Fertilizer", amount: 2.525 },
  { colorName: "Weed killer", amount: 3.018 },
  { colorName: "Water", amount: 3.682 },
];

export default class Table extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
    };
  }

  render() {
    const { data: chartData } = this.state;

    return (
      <Paper>
        <Chart data={chartData}>
          <ArgumentAxis />
          <ValueAxis max={7} />
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
}
