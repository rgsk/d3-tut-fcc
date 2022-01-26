import { useState, useCallback } from "react";
import { useKeepChildWithinBoundsOfParent } from "./useKeepChildWithinBoundsOfParent";
import { usePreviousValue } from "./usePreviousValue";
export const useHandleToolTip = ({
  toolTipTransitionDuration = 0,
  marginFromBounds = 0,
}) => {
  const [toolTip, setToolTip] = useState(null);
  const previousToolTip = usePreviousValue(toolTip);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { parentRef, childRef } = useKeepChildWithinBoundsOfParent({
    transitionDuration: toolTipTransitionDuration,
    marginFromBounds,
    deps: [mousePosition],
  });

  const handleMouseMove = useCallback(
    (e) => {
      if (toolTip && toolTip !== previousToolTip) {
        setMousePosition({
          x: e.clientX,
          y: e.clientY,
        });
      }
    },
    [setMousePosition, toolTip, previousToolTip]
  );
  return {
    toolTip,
    setToolTip,
    toolTipParentRef: parentRef,
    toolTipRef: childRef,
    handleMouseMove,
    mousePosition,
  };
};
