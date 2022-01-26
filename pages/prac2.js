import { useState } from "react";
import { useKeepChildWithinBoundsOfParent } from "../hooks/useKeepChildWithinBoundsOfParent";
const PagePrac2 = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { parentRef, childRef } = useKeepChildWithinBoundsOfParent({
    transitionDuration: 300,
    marginFromBounds: 10,
    deps: [mousePosition],
  });
  return (
    <div
      ref={parentRef}
      onMouseMove={(e) => {
        setMousePosition({
          x: e.clientX,
          y: e.clientY,
        });
      }}
      style={{
        width: "50vw",
        height: "50vh",
        position: "relative",
        backgroundColor: "#dfdfdf",
      }}
    >
      <div
        ref={childRef}
        style={{
          position: "absolute",
          top: `${mousePosition.y}px`,
          left: `${mousePosition.x}px`,
          width: 100,
          height: 100,
          backgroundColor: "blue",
          transition: "all 300ms ease",
        }}
      ></div>
    </div>
  );
};
export default PagePrac2;
