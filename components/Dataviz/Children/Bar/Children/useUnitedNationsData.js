import { useState, useEffect } from "react";
import * as d3 from "d3";
const unitedNationsUrl =
  "https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv";
export const useUnitedNationsData = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const row = (d) => {
      d.Population = +d["2020"] * 1000;
      return d;
    };
    d3.csv(unitedNationsUrl, row).then((data) => {
      console.log(data.slice(0, 10));
      setData(data.slice(0, 10));
    });
  }, []);
  return data;
};
