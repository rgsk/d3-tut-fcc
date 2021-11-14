import styles from "../Bar.module.scss";
export const Legend = ({
  innerWidth,
  innerHeight,
  xAxisLabelOffset,
  margin,
  yAxisLabelOffset,
}) => {
  return (
    <>
      <text
        className={styles.axisLabel}
        x={innerWidth / 2}
        y={innerHeight + xAxisLabelOffset}
        style={{
          textAnchor: "middle",
        }}
      >
        Population
      </text>
      <text
        className={styles.axisLabel}
        transform={`translate(-${margin.left - yAxisLabelOffset}, ${
          innerHeight / 2
        }) rotate(-90)`}
        style={{
          textAnchor: "middle",
        }}
      >
        Countries
      </text>
    </>
  );
};
