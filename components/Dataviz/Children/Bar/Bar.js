import React, { useMemo } from "react";
import { useState, useCallback } from "react";
import * as d3 from "d3";
import { Labels } from "./Children/Labels";
import { ToolTip } from "./Children/ToolTip";
import { Marks } from "./Children/Marks";
import { AxisBottom } from "./Children/AxisBottom";
import { AxisLeft } from "./Children/AxisLeft";
import { useUnitedNationsData } from "./Children/useUnitedNationsData";
import ReferenceLines from "./Children/ReferenceLines";
const width = 960;
const height = 500;
const margin = {
  left: 250,
  top: 20,
  right: 30,
  bottom: 70,
};

const labelOffset = {
  xAxis: 50,
  yAxis: 200,
};
const tickOffset = {
  x: 3,
  y: 3,
};
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
const yValue = (d) => d.Country;
const xValue = (d) => d.Population;
const labels = {
  xAxis: "Population",
  yAxis: "Countries",
};
function Bar() {
  const data = useUnitedNationsData();
  const [toolTip, setToolTip] = useState(null);
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

  const yScale = useMemo(() => {
    if (!data) return;
    return d3
      .scaleBand()
      .domain(data.map(yValue))
      .range([0, innerHeight])
      .paddingInner(0.15);
  }, [data]);
  const xScale = useMemo(() => {
    if (!data) return;
    return d3
      .scaleLinear()
      .domain([0, d3.max(data, xValue)])
      .range([0, innerWidth]);
  }, [data]);
  if (!data) return <p>Loading...</p>;

  return (
    <div
      style={{
        border: "1px solid red",
        width: "min-content",
      }}
    >
      <svg width={width} height={height} onMouseMove={handleMouseMove}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickFormat={xAxisTickFormat}
            tickOffset={tickOffset.x}
          />
          <AxisLeft yScale={yScale} tickOffset={tickOffset.y} />
          <Labels
            innerHeight={innerHeight}
            innerWidth={innerWidth}
            labelOffset={labelOffset}
            labels={labels}
          />
          <Marks
            data={data}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            setToolTip={setToolTip}
          />
          {/* <ReferenceLines innerHeight={innerHeight} innerWidth={innerWidth} /> */}
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
