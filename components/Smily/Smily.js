import { BackgroundCircle } from "./Children/BackgroundCircle";
import { Eyes } from "./Children/Eyes";
import { FaceContainer } from "./Children/FaceContainer";
import { Mouth } from "./Children/Mouth";
const width = 960;
const height = 500;
const centerX = width / 2;
const centerY = height / 2;
const strokeWidth = 10;
const eyeOffsetX = 90;
const eyeOffsetY = 90;
const eyeRadius = 50;
const mouthWidth = 20;
const mouthRadius = 140;

export const Smily = () => {
  return (
    <FaceContainer
      width={width}
      height={height}
      centerX={centerX}
      centerY={centerY}
    >
      <BackgroundCircle
        radius={centerY - strokeWidth / 2}
        strokeWidth={strokeWidth}
      />
      <Eyes
        eyeOffsetX={eyeOffsetX}
        eyeOffsetY={eyeOffsetY}
        eyeRadius={eyeRadius}
      />
      <Mouth mouthRadius={mouthRadius} mouthWidth={mouthWidth} />
    </FaceContainer>
  );
};
