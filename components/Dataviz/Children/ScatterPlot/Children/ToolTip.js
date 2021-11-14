import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../ScatterPlot.module.scss";
export function ToolTip({
  mousePosition,
  onMouseEnter,
  toolTip,
  toolTipMousePositionOffset,
  children,
  toolTipRef,
  transitionDuration,
}) {
  return (
    <AnimatePresence>
      {toolTip && (
        <motion.div
          ref={toolTipRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: transitionDuration / 1000,
          }}
          className={styles.toolTipContainer}
          style={{
            position: "absolute",
            top: mousePosition.y + toolTipMousePositionOffset.y,
            left: mousePosition.x + toolTipMousePositionOffset.x,
            transition: `all ${transitionDuration}ms ease`,
          }}
          onMouseEnter={onMouseEnter}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
