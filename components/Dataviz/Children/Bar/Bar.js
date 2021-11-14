import React from "react";
import { useState, useCallback } from "react";
import * as d3 from "d3";
import { Legend } from "./Children/Legend";
import { ToolTip } from "./Children/ToolTip";
import { Marks } from "./Children/Marks";
import { AxisBottom } from "./Children/AxisBottom";
import { AxisLeft } from "./Children/AxisLeft";
import { useUnitedNationsData } from "./Children/useUnitedNationsData";
const width = 960;
const height = 500;
const margin = {
  left: 250,
  top: 20,
  right: 30,
  bottom: 70,
};

const xAxisLabelOffset = 50;
const yAxisLabelOffset = 50;
const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right;
const toolTipRectPadding = {
  x: 7,
  y: 3,
};
const toolTipMousePositionOffset = {
  x: 20,
  y: 30,
};
const siFormat = d3.format(".2s");
const xAxisTickFormat = (tickValue) => siFormat(tickValue).replace("G", "B");

function Bar() {
  const data = useUnitedNationsData();
  const [toolTip, setToolTip] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = useCallback(
    (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    },
    [setMousePosition]
  );

  if (!data) return <p>Loading...</p>;
  const yValue = (d) => d.Country;
  const xValue = (d) => d.Population;
  const yScale = d3
    .scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .paddingInner(0.15);
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, xValue)])
    .range([0, innerWidth]);
  return (
    <div
      style={{
        // border: "1px solid red",
        width: "min-content",
      }}
    >
      <svg width={width} height={height} onMouseMove={handleMouseMove}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickFormat={xAxisTickFormat}
          />
          <AxisLeft yScale={yScale} />
          <Legend
            innerHeight={innerHeight}
            innerWidth={innerWidth}
            xAxisLabelOffset={xAxisLabelOffset}
            yAxisLabelOffset={yAxisLabelOffset}
            margin={margin}
          />
          <Marks
            data={data}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            setToolTip={setToolTip}
          />
        </g>
        <ToolTip
          mousePosition={mousePosition}
          toolTipFormat={xAxisTickFormat}
          toolTip={toolTip}
          toolTipMousePositionOffset={toolTipMousePositionOffset}
          toolTipRectPadding={toolTipRectPadding}
        />
      </svg>
    </div>
  );
}

export default Bar;
