export const AxisLeft = ({
  yScale,
  tickOffset = 0,
  innerHeight,
  innerWidth,
}) => {
  return (
    <>
      {yScale.ticks().map((tickValue, i) => (
        <g key={i}>
          <text
            x={0}
            dx="-1rem"
            y={innerHeight - yScale(tickValue)}
            style={{
              textAnchor: "end",
            }}
          >
            {tickValue}
          </text>
          <line
            x1={0}
            x2={innerWidth}
            y1={innerHeight - yScale(tickValue) - 5}
            y2={innerHeight - yScale(tickValue) - 5}
            stroke="#d1d1d1"
            style={{ transform: "translateX(-5px)" }}
            strokeWidth={1}
          ></line>
        </g>
      ))}
    </>
  );
};
