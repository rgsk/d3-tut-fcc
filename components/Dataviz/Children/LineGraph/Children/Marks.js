import styles from "../../Bar/Bar.module.scss";
import { motion } from "framer-motion";
import React from "react";
const lineVariants = {
  hidden: {
    opacity: 0,
    pathLength: 0,
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};
const circleVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.1,
      ease: "easeIn",
    },
  },
};

export const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  setToolTip,
  innerHeight,
}) => {
  return (
    <motion.g
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.2 }}
    >
      {data.map((d, i) => (
        <React.Fragment key={i}>
          {/* <rect
            onMouseEnter={() => {
              setToolTip(xValue(d));
            }}
            onMouseLeave={() => {
              setToolTip(null);
            }}
            className={styles.mark}
            x={xScale(xValue(d))}
            y={innerHeight - yScale(yValue(d))}
            width={xScale.bandwidth()}
            height={yScale(yValue(d))}
          /> */}
          <motion.line
            variants={lineVariants}
            stroke="#635f5d"
            strokeWidth={1}
            x1={xScale(xValue(d))}
            x2={xScale(xValue(d))}
            y1={innerHeight}
            y2={innerHeight - yScale(yValue(d))}
          ></motion.line>
          <motion.circle
            variants={circleVariants}
            className={styles.mark}
            key={i}
            cx={xScale(xValue(d))}
            cy={innerHeight - yScale(yValue(d))}
            r={6}
            onMouseEnter={() => {
              setToolTip([`${xValue(d)}: ${yValue(d)}`]);
            }}
            onMouseLeave={() => {
              setToolTip(null);
            }}
          />
          {i > 0 && (
            <motion.line
              variants={lineVariants}
              stroke="#688bab"
              strokeWidth={4}
              x1={xScale(xValue(data[i - 1]))}
              x2={xScale(xValue(data[i - 1])) + xScale.bandwidth() + 6}
              y1={innerHeight - yScale(yValue(data[i - 1]))}
              y2={innerHeight - yScale(yValue(data[i]))}
            ></motion.line>
          )}
        </React.Fragment>
      ))}
    </motion.g>
  );
};
