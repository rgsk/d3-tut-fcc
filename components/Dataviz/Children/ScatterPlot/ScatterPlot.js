import React, { useMemo } from "react";
import { useIrisData } from "./Children/useIrisData";
import * as d3 from "d3";
import { Marks } from "./Children/Marks";
import { AxisBottom } from "../Bar/Children/AxisBottom";
import { AxisLeft } from "./Children/AxisLeft";
import { Labels } from "../Bar/Children/Labels";
const width = 960;
const height = 500;
const margin = {
  left: 100,
  top: 20,
  right: 30,
  bottom: 70,
};

const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right;
const tickOffset = {
  x: 15,
  y: 15,
};
const labelOffset = {
  xAxis: 50,
  yAxis: 70,
};
const labelValues = {
  xAxis: "Sepal Length",
  yAxis: "Sepal Width",
};
const xValue = (d) => d["sepal_length"];
const yValue = (d) => d["sepal_width"];
function ScatterPlot() {
  const data = useIrisData();
  const xScale = useMemo(() => {
    if (!data) return;
    return (
      d3
        .scaleLinear()
        // .domain([d3.min(data, xValue), max(data, xValue)])
        .domain(d3.extent(data, xValue)) // shorter
        .range([0, innerWidth])
        .nice()
    );
  }, [data]);
  const yScale = useMemo(() => {
    if (!data) return;
    return d3
      .scaleLinear()
      .domain(d3.extent(data, yValue))
      .range([0, innerHeight])
      .nice();
  }, [data]);
  if (!data) return <p>Loading...</p>;
  return (
    <div
      style={{
        border: "1px solid red",
        width: "min-content",
      }}
    >
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <Marks
            data={data}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            // setToolTip={setToolTip}
          />
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickOffset={tickOffset.x}
          />
          <AxisLeft
            yScale={yScale}
            tickOffset={tickOffset.y}
            innerWidth={innerWidth}
          />
          <Labels
            innerHeight={innerHeight}
            innerWidth={innerWidth}
            labelOffset={labelOffset}
            labelValues={labelValues}
          />
        </g>
      </svg>
    </div>
  );
}

export default ScatterPlot;
