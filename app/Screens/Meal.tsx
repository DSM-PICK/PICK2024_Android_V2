import {
  Header,
  Layout,
  ScrollView,
  Text,
  View,
  WeekCalander,
} from "@/Components";
import { useMyQuery, useTheme } from "@/hooks";
import { StyleSheet } from "react-native";
import { useState } from "react";
import { getToday } from "@/utils";
import { IMeal } from "@/apis";

const { fullDay } = getToday();
const nameTable = ["조식", "중식", "석식"];

export const Meal = () => {
  const [date, setDate] = useState(fullDay);
  const { data: mealData } = useMyQuery<IMeal>("meal", `/date?date=${date}`);
  const { color } = useTheme();

  return (
    <Layout
      Header={<Header />}
      scrollAble
      style={{ paddingHorizontal: 0, alignItems: "flex-start", gap: 0 }}
      bottomPad
    >
      <WeekCalander onSelect={setDate} selected={date} direction="up" />
      <ScrollView style={{ width: "100%", flex: 1 }}>
        <View style={{ gap: 24, marginTop: 30 }}>
          <Text
            colorType="normal"
            colorLevel="black"
            fontType="heading"
            fontLevel={4}
            style={{ paddingHorizontal: 24, marginTop: 12 }}
          >
            {date === fullDay && (
              <Text
                colorType="main"
                colorLevel={500}
                fontType="heading"
                fontLevel={4}
              >
                오늘{" "}
              </Text>
            )}
            {date.split("-")[1]}월 {date.split("-")[2]}일
          </Text>
          <View style={{ gap: 20, width: "100%", paddingHorizontal: 24 }}>
            {mealData &&
              Object.values(mealData?.meal_list ?? {}).map((item, index) => (
                <View
                  key={index}
                  style={{
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: color("main", 50, true),
                    width: "100%",
                    alignSelf: "center",
                    gap: 50,
                    paddingHorizontal: 40,
                    paddingVertical: 20,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View style={{ gap: 10, alignItems: "center" }}>
                    <Text
                      colorType="main"
                      style={{ width: 100, textAlign: "center" }}
                      colorLevel={700}
                      fontType="subTitle"
                      fontLevel={1}
                    >
                      {nameTable[index]}
                    </Text>
                    <View
                      style={{
                        ...styles.contentContainer,
                        backgroundColor: color("main", 500),
                      }}
                    >
                      <Text
                        colorType="normal"
                        colorLevel="white"
                        fontType="body"
                        fontLevel={1}
                      >
                        {item.menu?.length ? item.cal : "0 Kcal"}
                      </Text>
                    </View>
                  </View>
                  <Text
                    colorType="normal"
                    colorLevel="black"
                    fontType="body"
                    fontLevel={1}
                    style={{ width: 116 }}
                  >
                    {item.menu?.length
                      ? item.menu.join("\n")
                      : "급식이 없습니다"}
                  </Text>
                </View>
              ))}
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 24,
  },
  contentContainer: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    width: 110,
    alignItems: "center",
  },
});
