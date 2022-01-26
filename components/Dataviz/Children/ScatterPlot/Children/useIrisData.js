import { useEffect, useState } from "react";
import * as d3 from "d3";

const url =
  "https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv";
export const useIrisData = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const row = (d) => {
      // covert string to numbers
      d.petal_length = +d.petal_length;
      d.petal_width = +d.petal_width;
      d.sepal_length = +d.sepal_length;
      d.sepal_width = +d.sepal_width;
      return d;
    };
    d3.csv(url, row).then((data) => {
      console.log(data);
      setData(data);
    });
  }, []);
  return data;
};
