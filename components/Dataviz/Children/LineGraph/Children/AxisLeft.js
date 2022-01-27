export const AxisLeft = ({ yScale, tickOffset = 0, innerHeight }) => {
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
        </g>
      ))}
    </>
  );
};
