import { useEffect, useState } from "react";
import * as d3 from "d3";
const fetchCSV = async (url) => {
  const response = await fetch(url);
  const text = await response.text();
  return text;
};
const width = 960;
const height = 500;
const centerX = width / 2;
const centerY = height / 2;
const pieArc = d3.arc().innerRadius(0).outerRadius(width);

const Dataviz = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const csvUrl =
      "https://gist.githubusercontent.com/rgsk/62f6eef8a12601450938c6dd28c1e463/raw/cssNamedColors.csv";
    d3.csv(csvUrl).then((data) => {
      setData(data);
      console.log(data);
      const text = d3.csvFormat(data);
      console.log(text.length + " bytes");
      console.log(text.length / 1024 + " kb");
      console.log(data.length + " rows");
      console.log(data.columns.length + " columns");
    });
    // With fetch, async and await
    // fetchCSV(csvUrl).then((text) => {
    //   const data = d3.csvParse(text);
    //   console.log(text.length + " bytes");
    //   console.log(text.length / 1024 + " kb");
    //   console.log(data.length + " rows");
    //   console.log(data.columns.length + " columns");
    // });
  }, []);
  if (!data) {
    return <pre>Loading...</pre>;
  }
  return (
    <svg width={width} height={height}>
      <g transform={`translate(${centerX}, ${centerY})`}>
        {/* {data.map((d, i) => (
          <path
            key={i}
            fill={d["RGB hex value"]}
            d={pieArc({
              startAngle: (i / data.length) * 2 * Math.PI,
              endAngle: ((i + 1) / data.length) * 2 * Math.PI,
            })}
          />
        ))} */}
        {d3
          .pie()
          .value(1)(data)
          .map((d, i) => (
            <path key={i} fill={d.data["RGB hex value"]} d={pieArc(d)} />
          ))}
      </g>
    </svg>
  );
};
export default Dataviz;
