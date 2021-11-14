import styles from "../ScatterPlot.module.scss";
export const Marks = ({ data, xScale, yScale, xValue, yValue, setToolTip }) => {
  return (
    <>
      {data.map((d, i) => (
        <circle
          className={styles.mark}
          key={i}
          cx={xScale(xValue(d))}
          cy={yScale(yValue(d))}
          r={10}
        />
      ))}
    </>
  );
};
