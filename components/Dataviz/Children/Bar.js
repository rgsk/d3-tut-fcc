import React, { useLayoutEffect, useRef } from "react";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Bar.module.scss";
import * as d3 from "d3";
const width = 960;
const height = 500;
const margin = {
  left: 220,
  top: 20,
  right: 30,
  bottom: 70,
};

const xAxisLabelOffset = 50;
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
const unitedNationsUrl =
  "https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv";
const useData = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const row = (d) => {
      d.Population = +d["2020"] * 1000;
      return d;
    };
    d3.csv(unitedNationsUrl, row).then((data) => {
      console.log(data);
      setData(data.slice(0, 10));
    });
  }, []);
  return data;
};
const AxisBottom = ({ xScale, innerHeight, tickFormat }) => {
  return (
    <>
      {xScale.ticks().map((tickValue, i) => (
        <g
          className={styles.tick}
          key={i}
          transform={`translate(${xScale(tickValue)}, 0)`}
        >
          <line y2={innerHeight} />
          <text
            y={innerHeight + 3}
            dy=".71em"
            style={{
              textAnchor: "middle",
            }}
          >
            {tickFormat(tickValue)}
          </text>
        </g>
      ))}
    </>
  );
};
const AxisLeft = ({ yScale }) => {
  return (
    <>
      {yScale.domain().map((tickValue, i) => (
        <g key={i}>
          <text
            x={-3}
            dy=".32em"
            y={yScale(tickValue) + yScale.bandwidth() / 2}
            style={{
              textAnchor: "end",
            }}
          >
            {tickValue}
          </text>
        </g>
      ))}
    </>
  );
};
const Marks = ({ data, xScale, yScale, xValue, yValue, setToolTip }) => {
  return (
    <>
      {data.map((d, i) => (
        <rect
          onMouseEnter={() => {
            setToolTip(xValue(d));
          }}
          onMouseLeave={() => {
            setToolTip("");
          }}
          className={styles.mark}
          key={i}
          x={0}
          y={yScale(yValue(d))}
          width={xScale(xValue(d))}
          height={yScale.bandwidth()}
        />
      ))}
    </>
  );
};
const ToolTip = ({ mousePosition, toolTip, toolTipFormat }) => {
  const textRef = useRef();

  const [toolTipRect, setToolTipRect] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (textRef.current) {
      const text = d3.select(textRef.current);
      const bbox = text.node().getBBox();
      setToolTipRect({
        x: bbox.x - toolTipRectPadding.x,
        y: bbox.y - toolTipRectPadding.y,
        width: bbox.width + toolTipRectPadding.x * 2,
        height: bbox.height + toolTipRectPadding.y * 2,
      });
    }
  }, [mousePosition]);
  if (!toolTip) return null;
  return (
    <AnimatePresence>
      {toolTip && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <rect {...toolTipRect} className={styles.toolTipContainer}></rect>
          <text
            ref={textRef}
            x={mousePosition.x + toolTipMousePositionOffset.x}
            y={mousePosition.y + toolTipMousePositionOffset.y}
            className={styles.toolTip}
          >
            {toolTipFormat(toolTip)}
          </text>
        </motion.g>
      )}
    </AnimatePresence>
  );
};
function Bar() {
  const data = useData();
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
          />
          <AxisLeft yScale={yScale} />
          <text
            className={styles.axisLabel}
            x={innerWidth / 2}
            y={innerHeight + xAxisLabelOffset}
            style={{
              textAnchor: "middle",
            }}
          >
            Population
          </text>
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
        />
      </svg>
    </div>
  );
}

export default Bar;
