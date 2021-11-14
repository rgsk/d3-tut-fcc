import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../ScatterPlot.module.scss";
export function ToolTip({
  mousePosition,
  onMouseEnter,
  toolTip,
  toolTipMousePositionOffset,
  children,
}) {
  return (
    <AnimatePresence>
      {toolTip && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.2,
          }}
          className={styles.toolTipContainer}
          style={{
            position: "absolute",
            top: mousePosition.y + toolTipMousePositionOffset.y,
            left: mousePosition.x + toolTipMousePositionOffset.x,
          }}
          onMouseEnter={onMouseEnter}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
