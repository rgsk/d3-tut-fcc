import styles from "../../Bar/Bar.module.scss";
export const AxisBottom = ({
  xScale,
  innerHeight,
  tickFormat = (v) => v,
  tickOffset = 0,
}) => {
  return (
    <>
      {xScale.domain().map((tickValue, i) => (
        <g key={i}>
          <text
            dy="1em"
            style={{
              transform: `translate(${xScale(
                tickValue
              )}px, ${innerHeight}px) rotate(20deg)`,
            }}
          >
            {tickFormat(tickValue)}
          </text>
        </g>
      ))}
    </>
  );
};
