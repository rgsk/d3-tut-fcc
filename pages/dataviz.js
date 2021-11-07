import { useEffect } from "react";
import * as d3 from "d3";
const fetchCSV = async (url) => {
  const response = await fetch(url);
  const text = await response.text();
  return text;
};
const Dataviz = () => {
  useEffect(() => {
    const csvUrl =
      "https://gist.githubusercontent.com/rgsk/62f6eef8a12601450938c6dd28c1e463/raw/cssNamedColors.csv";
    d3.csv(csvUrl).then((data) => {
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
  return <div>data viz</div>;
};
export default Dataviz;
