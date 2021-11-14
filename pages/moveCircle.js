import React, { useCallback, useState } from "react";
const width = 480;
const height = 500;
const initalMousePosition = { x: width / 2, y: height / 2 };
function MoveCircle() {
  const [mousePosition, setMousePosition] = useState(initalMousePosition);
  const handleMouseMove = useCallback(
    (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    },
    [setMousePosition]
  );
  return (
    <div>
      <svg
        style={{
          border: "1px solid red",
        }}
        width={width}
        height={height}
        onMouseMove={handleMouseMove}
      >
        <circle
          cx={mousePosition.x}
          cy={mousePosition.y}
          r={circleRadius}
        ></circle>
      </svg>
    </div>
  );
}

export default MoveCircle;
