export const BackgroundCircle = ({ radius, strokeWidth }) => {
  return (
    <circle
      r={radius}
      fill="yellow"
      stroke="black"
      strokeWidth={strokeWidth}
    ></circle>
  );
};
