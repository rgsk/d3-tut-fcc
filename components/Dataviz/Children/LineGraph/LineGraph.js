import React, { useMemo } from "react";
import * as d3 from "d3";
import { Labels } from "../Bar/Children/Labels";
import { Marks } from "./Children/Marks";
import { AxisBottom } from "./Children/AxisBottom";
import { AxisLeft } from "./Children/AxisLeft";
import { useUnitedNationsData } from "../Bar/Children/useUnitedNationsData";
import ReferenceLines from "../Bar/Children/ReferenceLines";
import { ToolTip } from "../ScatterPlot/Children/ToolTip";
import { useHandleToolTip } from "../../../../hooks/useHandlToolTip";
const width = 960;
const height = 500;
const margin = {
  left: 200,
  top: 20,
  right: 50,
  bottom: 150,
};

const labelOffset = {
  xAxis: 120,
  yAxis: 150,
};
const tickOffset = {
  x: 3,
  y: 3,
};
const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right;

const toolTipMousePositionOffset = {
  x: 15,
  y: 15,
};
const toolTipTransitionDuration = 100;
const siFormat = d3.format(".2s");
const xAxisTickFormat = (tickValue) => tickValue;
const yValue = (d) => d.Population;
const xValue = (d) => d.Country;
const labels = {
  xAxis: "Countries",
  yAxis: "Population",
};
function LineGraph() {
  const data = useUnitedNationsData();
  const {
    toolTip,
    setToolTip,
    toolTipParentRef,
    toolTipRef,
    handleMouseMove,
    mousePosition,
  } = useHandleToolTip({
    toolTipTransitionDuration,
    marginFromBounds: 10,
  });

  const xScale = useMemo(() => {
    if (!data) return;
    return d3
      .scaleBand()
      .domain(data.map(xValue))
      .range([0, innerWidth])
      .paddingInner(0.15);
  }, [data]);
  const yScale = useMemo(() => {
    if (!data) return;
    return d3
      .scaleLinear()
      .domain([0, d3.max(data, yValue)])
      .range([0, innerHeight]);
  }, [data]);
  if (!data) return <p>Loading...</p>;

  return (
    <div
      style={{
        border: "1px solid red",
        width: "min-content",
        position: "relative",
      }}
      ref={toolTipParentRef}
      onMouseMove={handleMouseMove}
    >
      <ToolTip
        toolTipRef={toolTipRef}
        mousePosition={mousePosition}
        onMouseEnter={() => {
          setToolTip(null);
        }}
        toolTip={toolTip}
        toolTipMousePositionOffset={toolTipMousePositionOffset}
        transitionDuration={toolTipTransitionDuration}
      >
        <p
          style={{
            fontSize: "small",
          }}
        >
          {xAxisTickFormat(toolTip)}
        </p>
      </ToolTip>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickFormat={xAxisTickFormat}
            tickOffset={tickOffset.x}
            innerWidth={innerWidth}
          />

          <AxisLeft
            yScale={yScale}
            tickOffset={tickOffset.y}
            innerHeight={innerHeight}
            innerWidth={innerWidth}
          />
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
            innerHeight={innerHeight}
            setToolTip={setToolTip}
          />
          {/* <ReferenceLines innerHeight={innerHeight} innerWidth={innerWidth} /> */}
        </g>
      </svg>
    </div>
  );
}

export default LineGraph;
