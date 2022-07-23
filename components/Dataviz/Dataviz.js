import React from 'react';
import Bar from './Children/Bar/Bar';
import LineGraph from './Children/LineGraph/LineGraph';
import Radial from './Children/Radial';
import ScatterPlot from './Children/ScatterPlot/ScatterPlot';
import CurvedLineGraph from './Children/CurvedLineGraph/CurvedLineGraph';

function Dataviz() {
  return (
    <div>
      <ScatterPlot />
      {/* <Bar /> */}
      {/* <CurvedLineGraph /> */}
      {/* <LineGraph /> */}
    </div>
  );
}

export default Dataviz;
