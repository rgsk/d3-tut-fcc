import React from "react";
import { useEffect, useState } from "react";
import * as d3 from "d3";
const width = 960;
const height = 500;
const margin = {
  left: 20,
  top: 20,
  right: 20,
  bottom: 20,
};
const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right;
const unitedNationsUrl =
  "https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv";

function Bar() {
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
  if (!data) return <p>Loading...</p>;
  const yScale = d3
    .scaleBand()
    .domain(data.map((d) => d.Country))
    .range([0, innerHeight]);
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.Population)])
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
          {data.map((d, i) => (
            <rect
              key={i}
              x={0}
              y={yScale(d.Country)}
              width={xScale(d.Population)}
              height={yScale.bandwidth()}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}

export default Bar;
