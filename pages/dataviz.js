import { useEffect } from "react";
const fetchCSV = async (url) => {
  const response = await fetch(url);
  const text = await response.text();
  return text;
};
const Dataviz = () => {
  useEffect(() => {
    const csvUrl =
      "https://gist.githubusercontent.com/rgsk/62f6eef8a12601450938c6dd28c1e463/raw/cssNamedColors.csv";
    fetchCSV(csvUrl).then((text) => console.log(text));
  }, []);
  return <div>data viz</div>;
};
export default Dataviz;
