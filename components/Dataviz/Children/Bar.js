import React from "react";
import { useEffect, useState } from "react";
import * as d3 from "d3";
const width = 960;
const height = 500;
const margin = {
  left: 200,
  top: 20,
  right: 20,
  bottom: 20,
};
const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right;
const unitedNationsUrl =
  "https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv";
const useData = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const row = (d) => {
      d.Population = +d["2020"];
      return d;
    };
    d3.csv(unitedNationsUrl, row).then((data) => {
      console.log(data);
      setData(data.slice(0, 10));
    });
  }, []);
  return data;
};
const AxisBottom = ({ xScale, innerHeight }) => {
  return (
    <>
      {xScale.ticks().map((tickValue, i) => (
        <g key={i} transform={`translate(${xScale(tickValue)}, 0)`}>
          <line stroke="black" y2={innerHeight} />
          <text
            y={innerHeight + 3}
            dy=".71em"
            style={{
              textAnchor: "middle",
            }}
          >
            {tickValue}
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
        <text
          key={i}
          x={-3}
          dy=".32em"
          y={yScale(tickValue) + yScale.bandwidth() / 2}
          style={{
            textAnchor: "end",
          }}
        >
          {tickValue}
        </text>
      ))}
    </>
  );
};
const Marks = ({ data, xScale, yScale, xValue, yValue }) => {
  return (
    <>
      {data.map((d, i) => (
        <rect
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
function Bar() {
  const data = useData();
  if (!data) return <p>Loading...</p>;
  const yValue = (d) => d.Country;
  const xValue = (d) => d.Population;
  const yScale = d3
    .scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight]);
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
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <AxisBottom xScale={xScale} innerHeight={innerHeight} />
          <AxisLeft yScale={yScale} />
          <Marks
            data={data}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
          />
        </g>
      </svg>
    </div>
  );
}

export default Bar;
