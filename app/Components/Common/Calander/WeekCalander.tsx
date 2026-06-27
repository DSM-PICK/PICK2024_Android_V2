import { useBottomSheet, useTheme } from "@/hooks";
import { View } from "../AnimatedComponents";
import { IProp as ICalProp, Calander } from "./";
import { Icon } from "../Icon";

interface IProp extends ICalProp {
  direction?: "up" | "down";
}

export const WeekCalander = (props: IProp) => {
  const { color } = useTheme();
  const { open } = useBottomSheet();
  const direction = props.direction;

  return (
    <View style={{ width: "100%", position: "relative" }}>
      {direction === "up" && (
        <View
          style={{
            width: "100%",
            height: 50,
            backgroundColor: color("bg"),
            position: "absolute",
            zIndex: 20,
            top: -50,
          }}
        />
      )}
      <View
        style={{
          width: "100%",
          padding: 20,
          paddingTop: 10,
          ...(direction === "up"
            ? { borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }
            : { borderTopLeftRadius: 20, borderTopRightRadius: 20 }),

          elevation: 20,
          flexDirection: direction === "up" ? "column-reverse" : "column",
          backgroundColor: color("bg"),
          alignItems: "center",
          gap: 20,
        }}
      >
        <Icon
          name="Arrrow"
          rotate={direction === "up" ? "down" : "up"}
          size={20}
          onPress={() => open(<Calander {...props} />)}
        />
        <Calander {...props} weekOnly />
      </View>
    </View>
  );
};
