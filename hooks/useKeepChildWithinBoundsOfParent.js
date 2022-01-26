/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";

export const useKeepChildWithinBoundsOfParent = ({
  transitionDuration = 0,
  deps = [],
  marginFromBounds = 0,
}) => {
  const childRef = useRef();
  const parentRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      if (parentRef.current && childRef.current) {
        const childBox = childRef.current.getBoundingClientRect();
        const parentBox = parentRef.current.getBoundingClientRect();
        const exceedRight = childBox.right + marginFromBounds - parentBox.right;
        const exceedBottom =
          childBox.bottom + marginFromBounds - parentBox.bottom;

        if (exceedRight > 0 && exceedBottom > 0) {
          childRef.current.style.transform = `translate(-${exceedRight}px, -${exceedBottom}px})`;
        } else if (exceedRight > 0) {
          childRef.current.style.transform = `translateX(-${exceedRight}px)`;
        } else if (exceedBottom > 0) {
          childRef.current.style.transform = `translateY(-${exceedBottom}px})`;
        } else {
          childRef.current.style.transform = ``;
        }
      }
    }, transitionDuration);
    return () => {
      if (childRef.current) childRef.current.style.transform = ``;
    };
  }, deps);
  return {
    childRef,
    parentRef,
  };
};
