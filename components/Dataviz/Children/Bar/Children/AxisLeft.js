import styles from "../Bar.module.scss";
export const AxisLeft = ({ yScale }) => {
  return (
    <>
      {yScale.domain().map((tickValue, i) => (
        <g key={i}>
          <text
            x={-3}
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
