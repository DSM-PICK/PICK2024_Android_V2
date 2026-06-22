# Feature Dev

## 화면 (Screen) 패턴

```typescript
import { ComponentA, ComponentB } from "@/Components";
import { instance, IType } from "@/apis";
import { useMyMutation, useToast } from "@/hooks";
import { useState } from "react";

interface IProp {
  navigation: any;
}

export const ScreenName = ({ navigation }: IProp) => {
  const { color } = useTheme();
  const { error } = useToast();
  const [state, setState] = useState({ ... });
  const { mutate } = useMyMutation<InType, OutType>("post", "user", "/endpoint");

  return (
    <KeyboardDismiss>
      <Layout Header={<Header />} scrollAble style={{ flex: 1 }}>
        ...
      </Layout>
    </KeyboardDismiss>
  );
};
```

## 컴포넌트 (Component) 패턴

```typescript
import { TouchableOpacity } from "@/Components/Common/AnimatedComponents";
import { Text } from "@/Components/Common/Text";
import { useTheme } from "@/hooks";

interface IProp {
  onPress: () => void;
  children: string;
}

export const Button = ({ onPress, children }: IProp) => {
  const { color } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ backgroundColor: color("main", 500) }}
    >
      <Text ...>{children}</Text>
    </TouchableOpacity>
  );
};
```

## Zustand Store 패턴

```typescript
import { create } from "zustand";
import { getItem, setItem } from "@/utils/storage";

interface IStore {
  value: number;
  setValue: (v: number) => void;
  load: () => Promise<void>;
}

export const useStore = create<IStore>((set) => ({
  value: 0,
  setValue: (value) => set({ value }),
  load: async () => {
    const saved = await getItem("key");
    if (saved) set({ value: JSON.parse(saved) });
  },
}));
```

## API Query 패턴

```typescript
import { useMyQuery } from "@/hooks";
import { IType } from "@/apis/types";

export const Component = () => {
  const { data, isLoading } = useMyQuery<IType>("get", "/endpoint", ["key"]);
  if (isLoading) return <Text>Loading...</Text>;
  return <Text>{data?.field}</Text>;
};
```

## API Mutation 패턴

```typescript
import { useMyMutation, useToast } from "@/hooks";

export const Component = () => {
  const { success, error } = useToast();
  const { mutate } = useMyMutation<InType, OutType>("post", "user", "/endpoint");
  const handlePress = () => {
    mutate(payload, {
      onSuccess: () => success("완료"),
      onError: () => error("실패"),
    });
  };
  return <Button onPress={handlePress}>전송</Button>;
};
```

## 새 화면 추가 패턴

1. `app/Screens/`에 새 디렉토리 생성 (FeatureName/)
2. `index.ts` barrel export를 통해 화면 컴포넌트 export
3. `app/Navigation/index.tsx`에 Stack.Screen 추가 (한국어 route name)
4. 필요시 `app/Navigation/MainTabs.tsx`에 Tab 추가

## 네비게이션 패턴

```typescript
// Stack Navigator에 추가
<Stack.Screen name="화면명" component={ScreenName} />
```

## SVG Icon 패턴

```typescript
// app/assets/icons/에 SVG 파일 추가 후
// app/assets/icons/index.ts에 export 등록
import { Icon } from "@/Components";
<Icon name="iconName" width={24} height={24} />
```

## 색상/테마 사용 패턴

```typescript
const { color } = useTheme();
// color(category: string, weight: number, noAnim?: boolean)
color("main", 500);       // animated color
color("main", 500, true); // static color (no animation)
```
