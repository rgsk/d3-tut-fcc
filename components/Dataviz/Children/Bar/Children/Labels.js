import styles from "../Bar.module.scss";
export const Labels = ({ innerWidth, innerHeight, labelOffset, labels }) => {
  return (
    <>
      <text
        className={styles.axisLabel}
        x={innerWidth / 2}
        y={innerHeight + labelOffset.xAxis}
        textAnchor="middle"
        // or set in css class or style={{}}
      >
        {labels.xAxis}
      </text>
      <text
        dy=".32em"
        className={styles.axisLabel}
        transform={`translate(-${labelOffset.yAxis}, ${
          innerHeight / 2
        }) rotate(-90)`}
        textAnchor="middle"
      >
        {labels.yAxis}
      </text>
    </>
  );
};
