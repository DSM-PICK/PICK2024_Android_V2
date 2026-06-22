import { IColorProp, useTheme } from "@/hooks";
import { SvgProps } from "react-native-svg";
import * as Icons from "@/assets";

const iconMap = { ...Icons };

const rotateTable = {
  up: "0deg",
  down: "180deg",
  right: "90deg",
  left: "-90deg",
};

export type iconType = keyof typeof Icons;

interface IProp extends Omit<SvgProps, "color">, IColorProp {
  name: iconType;
  rotate?: keyof typeof rotateTable;
  size?: number;
}

export const Icon = ({
  colorLevel,
  colorType,
  name,
  rotate = "up",
  size = 36,
  ...props
}: IProp) => {
  const IconSVG = iconMap[name];
  const { color } = useTheme();
  const fillColor = color(colorType || "gray", colorLevel || 400, true);

  return (
    <IconSVG
      {...props}
      hitSlop={{ top: 5, bottom: 5, right: 5, left: 5 }}
      width={size}
      height={size}
      fill={fillColor}
      style={[
        props.style,
        {
          transform: [{ rotate: rotateTable[rotate] }],
          fill: fillColor,
        },
      ]}
    />
  );
};
