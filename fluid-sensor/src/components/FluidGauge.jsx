import React from 'react'
import LiquidFillGauge from 'react-liquid-gauge'

export const FluidGauge = ({ fluidAmount, fillColor }) => (
  <LiquidFillGauge
    style={{ margin: '0 auto' }}
    width={200}
    height={200}
    value={fluidAmount}
    percent="l"
    textSize={0.5}
    textOffsetX={0}
    textOffsetY={0}
    textRenderer={(props) => {
      const value = Math.round(props.value)
      const radius = Math.min(props.height / 2, props.width / 2)
      const textPixels = (props.textSize * radius) / 2
      const valueStyle = {
        fontSize: textPixels
      }
      const percentStyle = {
        fontSize: textPixels * 0.6
      }

      return (
        <tspan>
          <tspan className="value" style={valueStyle}>
            {value}
          </tspan>
          <tspan style={percentStyle}>{props.percent}</tspan>
        </tspan>
      )
    }}
    riseAnimation
    waveAnimation
    waveFrequency={2}
    waveAmplitude={1}
    gradient
    // gradientStops={gradientStops}
    circleStyle={{
      fill: fillColor
    }}
    waveStyle={{
      fill: fillColor
    }}
    // textStyle={{
    //     fill: color('#444').toString(),
    //     fontFamily: 'Arial'
    // }}
    // waveTextStyle={{
    //     fill: color('#fff').toString(),
    //     fontFamily: 'Arial'
    // }}
  />
)
