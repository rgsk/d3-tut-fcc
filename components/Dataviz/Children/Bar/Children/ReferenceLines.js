import React from "react";

function ReferenceLines({ innerWidth, innerHeight }) {
  return (
    <>
      <line
        x1={innerWidth / 2}
        y1={0}
        x2={innerWidth / 2}
        y2={innerHeight}
        stroke="#000"
      />
      <line
        x1={0}
        y1={innerHeight / 2}
        x2={innerWidth}
        y2={innerHeight / 2}
        stroke="#000"
      />
    </>
  );
}

export default ReferenceLines;
