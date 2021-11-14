import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "../Bar.module.scss";
import * as d3 from "d3";
export const ToolTip = ({
  mousePosition,
  toolTip,
  toolTipFormat = (v) => v,
  toolTipMousePositionOffset,
  toolTipRectPadding,
  rowSpacing = 0,
}) => {
  const computedToolTip = useMemo(() => {
    if (Array.isArray(toolTip)) {
      return toolTip;
    }
    return [toolTip];
  }, [toolTip]);
  const textContainerRef = useRef();

  const [toolTipRect, setToolTipRect] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (textContainerRef.current) {
      const text = d3.select(textContainerRef.current);
      const bbox = text.node().getBBox();
      setToolTipRect({
        x: bbox.x - toolTipRectPadding.x,
        y: bbox.y - toolTipRectPadding.y,
        width: bbox.width + toolTipRectPadding.x * 2,
        height: bbox.height + toolTipRectPadding.y * 2,
      });
    }
  }, [mousePosition, toolTipRectPadding]);
  if (!toolTip) return null;
  return (
    <AnimatePresence>
      {toolTip && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <rect {...toolTipRect} className={styles.toolTipContainer} />
          <g ref={textContainerRef}>
            {computedToolTip.map((tip, i) => (
              <text
                key={i}
                x={mousePosition.x + toolTipMousePositionOffset.x}
                y={
                  mousePosition.y +
                  toolTipMousePositionOffset.y +
                  (rowSpacing + 12) * i
                }
                className={styles.toolTip}
              >
                {toolTipFormat(tip)}
              </text>
            ))}
          </g>
        </motion.g>
      )}
    </AnimatePresence>
  );
};
