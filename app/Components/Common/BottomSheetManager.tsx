import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCallback, useEffect, useMemo, useRef, memo } from "react";
import { useBottomSheet, useTheme } from "@/hooks";
import { View } from "./AnimatedComponents";
import { StyleSheet } from "react-native";

const BottomSheetManagerComponent = () => {
  const { color } = useTheme();
  const { isOpened, component, set } = useBottomSheet();
  const snapPoints = useMemo(() => ["55%"], []);
  const { bottom } = useSafeAreaInsets();

  const ref = useRef<BottomSheet>(null);

  useEffect(() => {
    if (isOpened) {
      ref?.current?.expand();
    } else {
      ref?.current?.close();
    }
  }, [isOpened]);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        style={[props.style, { backgroundColor: "#00000000" }]}
        pressBehavior="close"
        opacity={0.5}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      >
        <View style={styles.background} />
      </BottomSheetBackdrop>
    ),
    [],
  );

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        set({ isOpened: false, component: undefined });
      }
    },
    [set],
  );

  return (
    <BottomSheet
      backdropComponent={isOpened ? renderBackdrop : null}
      ref={ref}
      index={-1}
      enableContentPanningGesture={false}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      handleStyle={{
        backgroundColor: color("bg", null, true),
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
      }}
      handleIndicatorStyle={{ backgroundColor: color("gray", 300, true) }}
      backgroundStyle={{
        backgroundColor: color("bg", null, true),
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
      }}
    >
      <BottomSheetView
        style={{ ...styles.contentContainer, paddingBottom: bottom + 18 }}
      >
        {component}
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 18,
  },
  background: {
    width: "100%",
    backgroundColor: "black",
    position: "absolute",
    top: -200,
    height: "200%",
    opacity: 0.5,
  },
});

export const BottomSheetManager = memo(BottomSheetManagerComponent);
