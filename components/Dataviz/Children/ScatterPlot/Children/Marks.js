import styles from "../ScatterPlot.module.scss";
export const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  setToolTip,
  markRadius,
  labels,
}) => {
  return (
    <>
      {data.map((d, i) => (
        <circle
          className={styles.mark}
          key={i}
          cx={xScale(xValue(d))}
          cy={yScale(yValue(d))}
          r={markRadius}
          onMouseEnter={() => {
            setToolTip([
              `${labels.xAxis}: ${xValue(d)}`,
              `${labels.yAxis}: ${yValue(d)}`,
            ]);
          }}
          onMouseLeave={() => {
            setToolTip(null);
          }}
        />
      ))}
    </>
  );
};
