import React, {
  useMemo,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { useIrisData } from "./Children/useIrisData";
import * as d3 from "d3";
import { Marks } from "./Children/Marks";
import { AxisBottom } from "../Bar/Children/AxisBottom";
import { AxisLeft } from "./Children/AxisLeft";
import { Labels } from "../Bar/Children/Labels";
import { ToolTip } from "./Children/ToolTip";
import styles from "./ScatterPlot.module.scss";
import { useKeepChildWithinBoundsOfParent } from "../../../../hooks/useKeepChildWithinBoundsOfParent";
import { usePreviousValue } from "../../../../hooks/usePreviousValue";
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
const markRadius = 10;
const labels = {
  xAxis: "Sepal Length",
  yAxis: "Sepal Width",
};

const toolTipMousePositionOffset = {
  x: 15,
  y: 15,
};
const toolTipTransitionDuration = 100;
const xValue = (d) => d["sepal_length"];
const yValue = (d) => d["sepal_width"];
function ScatterPlot() {
  const data = useIrisData();
  const [toolTip, setToolTip] = useState(null);
  const previousToolTip = usePreviousValue(toolTip);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { parentRef, childRef } = useKeepChildWithinBoundsOfParent({
    transitionDuration: toolTipTransitionDuration,
    marginFromBounds: 10,
    deps: [mousePosition],
  });

  const handleMouseMove = useCallback(
    (e) => {
      if (toolTip && toolTip !== previousToolTip) {
        console.log({
          toolTip,
          previousToolTip,
        });
        setMousePosition({
          x: e.clientX,
          y: e.clientY,
        });
      }
    },
    [setMousePosition, toolTip, previousToolTip]
  );
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
        position: "relative",
        overflow: "hidden",
      }}
    >
      <ToolTip
        toolTipRef={childRef}
        mousePosition={mousePosition}
        onMouseEnter={() => {
          setToolTip(null);
        }}
        toolTip={toolTip}
        toolTipMousePositionOffset={toolTipMousePositionOffset}
        transitionDuration={toolTipTransitionDuration}
      >
        {toolTip?.map((v, i) => (
          <p key={i} className={styles.toolTipText}>
            {v}
          </p>
        ))}
      </ToolTip>
      <svg
        ref={parentRef}
        width={width}
        height={height}
        onMouseMove={handleMouseMove}
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
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
            labels={labels}
          />

          <Marks
            data={data}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            markRadius={markRadius}
            setToolTip={setToolTip}
            labels={labels}
          />
        </g>
      </svg>
    </div>
  );
}

export default ScatterPlot;
