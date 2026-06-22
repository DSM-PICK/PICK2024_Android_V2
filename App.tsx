import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ToastManager, BottomSheetManager, ModalManager } from "@/Components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  Alert,
  Animated,
  BackHandler,
  Linking,
  Platform,
  StatusBar,
} from "react-native";
import { useBottomSheet, useOptions, useTheme } from "@/hooks";
import { NavigationContainer } from "@react-navigation/native";
import { useMediaLibraryPermissions } from "expo-image-picker";
import { enableScreens } from "react-native-screens";
import { useEffect, useRef, useState } from "react";
import { getItem, navigationRef } from "@/utils";
import { Navigation } from "@/Navigation";
import { useFonts } from "expo-font";
import { Splash } from "@/Screens";
import InAppUpdates, {
  AndroidUpdateType,
} from "sp-react-native-in-app-updates";

enableScreens(true);

const ANDROID_STORE_URL = "market://details?id=com.sixstandard.PICK";

type AndroidUpdateSupport = {
  readonly isImmediateUpdateAllowed: boolean;
  readonly isFlexibleUpdateAllowed: boolean;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 1000 * 60 * 2,
      refetchOnWindowFocus: false,
    },
  },
});

const isAndroidUpdateSupport = (
  value: unknown,
): value is AndroidUpdateSupport => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const immediate = Object.getOwnPropertyDescriptor(
    value,
    "isImmediateUpdateAllowed",
  )?.value;
  const flexible = Object.getOwnPropertyDescriptor(
    value,
    "isFlexibleUpdateAllowed",
  )?.value;

  return typeof immediate === "boolean" && typeof flexible === "boolean";
};

const getAllowedAndroidUpdateType = ({
  isImmediateUpdateAllowed,
  isFlexibleUpdateAllowed,
}: AndroidUpdateSupport): AndroidUpdateType | null => {
  if (isImmediateUpdateAllowed) {
    return AndroidUpdateType.IMMEDIATE;
  }

  if (isFlexibleUpdateAllowed) {
    return AndroidUpdateType.FLEXIBLE;
  }

  return null;
};

const openStoreUpdate = () => {
  Linking.openURL(ANDROID_STORE_URL);
};

const showStoreUpdateFallback = () => {
  Alert.alert("새 버전", "최신 버전 이용을 위해 스토어로 이동합니다.", [
    {
      text: "확인",
      onPress: openStoreUpdate,
    },
  ]);
};

const checkInAppUpdate = async (
  inAppUpdates: InstanceType<typeof InAppUpdates>,
) => {
  if (Platform.OS !== "android") {
    return;
  }

  let result: Awaited<ReturnType<typeof inAppUpdates.checkNeedsUpdate>>;

  try {
    result = await inAppUpdates.checkNeedsUpdate();
  } catch (error) {
    if (error instanceof Error) {
      return;
    }

    throw error;
  }

  if (!result.shouldUpdate) {
    return;
  }

  if (!isAndroidUpdateSupport(result.other)) {
    showStoreUpdateFallback();
    return;
  }

  const updateType = getAllowedAndroidUpdateType(result.other);

  if (updateType === null) {
    showStoreUpdateFallback();
    return;
  }

  try {
    await inAppUpdates.startUpdate({ updateType });
  } catch (error) {
    if (error instanceof Error) {
      showStoreUpdateFallback();
      return;
    }

    throw error;
  }
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Medium: require("./app/assets/font/Medium.ttf"),
    Regular: require("./app/assets/font/Regular.ttf"),
    SemiBold: require("./app/assets/font/SemiBold.ttf"),
  });

  const fade = useRef(new Animated.Value(1)).current;
  const inAppUpdatesRef = useRef(new InAppUpdates(false));
  const isMountedRef = useRef(true);

  const [status, requestPermission] = useMediaLibraryPermissions();
  const { getTheme, load: loadTheme } = useTheme();
  const { close, isOpened } = useBottomSheet();
  const { load: loadOptions } = useOptions();

  const [token, setToken] = useState<null | undefined | string>(undefined);
  const [splash, setSplash] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await checkInAppUpdate(inAppUpdatesRef.current);

        const accessToken = await getItem("access_token");
        setToken(accessToken ?? null);
      } catch (error) {
        console.error("Setup error:", error);
        setToken(null);
      } finally {
        setTimeout(() => {
          Animated.timing(fade, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            if (isMountedRef.current) {
              setSplash(false);
            }
          });
        }, 1500);
      }
    };

    initializeApp();
    loadTheme();
    loadOptions();

    return () => {
      isMountedRef.current = false;
    };
  }, [fade, loadOptions, loadTheme]);

  useEffect(() => {
    if (!status?.granted) {
      requestPermission();
    }
  }, [requestPermission, status?.granted]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        close();
        return isOpened;
      },
    );
    return () => backHandler.remove();
  }, [isOpened, close]);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <NavigationContainer ref={navigationRef}>
            <StatusBar
              translucent
              backgroundColor="transparent"
              barStyle={
                getTheme() === "dark" ? "light-content" : "dark-content"
              }
            />
            {splash && <Splash fade={fade} />}
            {fontsLoaded && token !== undefined && <Navigation token={token} />}
            <ToastManager />
            <ModalManager />
            <BottomSheetManager />
          </NavigationContainer>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
