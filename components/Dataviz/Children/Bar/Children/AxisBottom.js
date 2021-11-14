import styles from "../Bar.module.scss";
export const AxisBottom = ({ xScale, innerHeight, tickFormat }) => {
  return (
    <>
      {xScale.ticks().map((tickValue, i) => (
        <g
          className={styles.tick}
          key={i}
          transform={`translate(${xScale(tickValue)}, 0)`}
        >
          <line y2={innerHeight} />
          <text
            y={innerHeight + 3}
            dy=".71em"
            style={{
              textAnchor: "middle",
            }}
          >
            {tickFormat(tickValue)}
          </text>
        </g>
      ))}
    </>
  );
};
