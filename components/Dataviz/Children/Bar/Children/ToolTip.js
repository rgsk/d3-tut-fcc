import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "../Bar.module.scss";
import * as d3 from "d3";
export const ToolTip = ({
  mousePosition,
  toolTip,
  toolTipFormat,
  toolTipMousePositionOffset,
  toolTipRectPadding,
}) => {
  const textRef = useRef();

  const [toolTipRect, setToolTipRect] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (textRef.current) {
      const text = d3.select(textRef.current);
      const bbox = text.node().getBBox();
      setToolTipRect({
        x: bbox.x - toolTipRectPadding.x,
        y: bbox.y - toolTipRectPadding.y,
        width: bbox.width + toolTipRectPadding.x * 2,
        height: bbox.height + toolTipRectPadding.y * 2,
      });
    }
  }, [mousePosition]);
  if (!toolTip) return null;
  return (
    <AnimatePresence>
      {toolTip && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <rect {...toolTipRect} className={styles.toolTipContainer}></rect>
          <text
            ref={textRef}
            x={mousePosition.x + toolTipMousePositionOffset.x}
            y={mousePosition.y + toolTipMousePositionOffset.y}
            className={styles.toolTip}
          >
            {toolTipFormat(toolTip)}
          </text>
        </motion.g>
      )}
    </AnimatePresence>
  );
};
