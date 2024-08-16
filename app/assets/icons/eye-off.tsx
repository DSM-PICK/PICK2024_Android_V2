import React from "react";
import { Iconprops } from ".";
import Svg, { Path } from "react-native-svg";
import { TouchableOpacity } from "react-native";

export default function EyeOff({ Fill, OnPress }: Iconprops) {
  return (
    <TouchableOpacity onPress={OnPress}>
      <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <Path
          d="M8.82083 8.8225C8.50832 9.13513 8.3328 9.55909 8.33288 10.0011C8.33295 10.4432 8.50863 10.8671 8.82125 11.1796C9.13388 11.4921 9.55784 11.6676 9.99988 11.6675C10.4419 11.6675 10.8658 11.4918 11.1783 11.1792M13.9008 13.8942C12.7319 14.6255 11.3789 15.0091 10 15C7 15 4.5 13.3333 2.5 10C3.56 8.23333 4.76 6.935 6.1 6.105M8.48333 5.15C8.98253 5.04894 9.49068 4.99869 10 5C13 5 15.5 6.66667 17.5 10C16.945 10.925 16.3508 11.7225 15.7183 12.3917M2.5 2.5L17.5 17.5"
          stroke={Fill}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </TouchableOpacity>
  );
}
