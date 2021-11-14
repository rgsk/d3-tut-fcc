import styles from "../Bar.module.scss";
export const Labels = ({
  innerWidth,
  innerHeight,
  labelOffset,
  labelValues,
}) => {
  return (
    <>
      <text
        className={styles.axisLabel}
        x={innerWidth / 2}
        y={innerHeight + labelOffset.xAxis}
        textAnchor="middle"
        // or set in css class or style={{}}
      >
        {labelValues.xAxis}
      </text>
      <text
        dy=".32em"
        className={styles.axisLabel}
        transform={`translate(-${labelOffset.yAxis}, ${
          innerHeight / 2
        }) rotate(-90)`}
        textAnchor="middle"
      >
        {labelValues.yAxis}
      </text>
    </>
  );
};
