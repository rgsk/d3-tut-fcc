import styles from "../Bar.module.scss";
export const Marks = ({ data, xScale, yScale, xValue, yValue, setToolTip }) => {
  return (
    <>
      {data.map((d, i) => (
        <rect
          onMouseEnter={() => {
            setToolTip(xValue(d));
          }}
          onMouseLeave={() => {
            setToolTip("");
          }}
          className={styles.mark}
          key={i}
          x={0}
          y={yScale(yValue(d))}
          width={xScale(xValue(d))}
          height={yScale.bandwidth()}
        />
      ))}
    </>
  );
};
