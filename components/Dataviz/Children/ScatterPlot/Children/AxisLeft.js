import styles from "../ScatterPlot.module.scss";
export const AxisLeft = ({ yScale, tickOffset = 0, innerWidth }) => {
  return (
    <>
      {yScale.ticks().map((tickValue, i) => (
        <g key={i} transform={`translate(0, ${yScale(tickValue)})`}>
          <line x2={innerWidth} />
          <text
            x={-tickOffset}
            dy=".32em"
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
