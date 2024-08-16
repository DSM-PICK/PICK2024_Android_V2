import React from "react";
import Svg, { Path } from "react-native-svg";
import { Iconprops } from ".";
import { TouchableOpacity } from "react-native";

export default function Eye({ Fill, OnPress }: Iconprops) {
  return (
    <TouchableOpacity onPress={OnPress}>
      <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <Path
          d="M8.33333 10C8.33333 10.442 8.50893 10.866 8.82149 11.1785C9.13405 11.4911 9.55797 11.6667 10 11.6667C10.442 11.6667 10.866 11.4911 11.1785 11.1785C11.4911 10.866 11.6667 10.442 11.6667 10C11.6667 9.55797 11.4911 9.13405 11.1785 8.82149C10.866 8.50893 10.442 8.33333 10 8.33333C9.55797 8.33333 9.13405 8.50893 8.82149 8.82149C8.50893 9.13405 8.33333 9.55797 8.33333 10Z"
          stroke={Fill}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M17.5 10C15.5 13.3333 13 15 10 15C7 15 4.5 13.3333 2.5 10C4.5 6.66667 7 5 10 5C13 5 15.5 6.66667 17.5 10Z"
          stroke={Fill}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </TouchableOpacity>
  );
}
