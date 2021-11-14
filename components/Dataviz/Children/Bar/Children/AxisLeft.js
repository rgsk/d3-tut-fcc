export const AxisLeft = ({ yScale, tickOffset = 0 }) => {
  return (
    <>
      {yScale.domain().map((tickValue, i) => (
        <g key={i}>
          <text
            x={-tickOffset}
            dy=".32em"
            y={yScale(tickValue) + yScale.bandwidth() / 2}
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
