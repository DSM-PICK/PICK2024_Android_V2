import React from "react";
import { View, Text } from "react-native";
import { useState } from "react";
import ScrollPicker from "@/components/common/scrollPicker";
import Modal from "@/components/common/modal";

interface PropType {
  visible: [boolean, string];
  setVisible: (visible: any) => void;
  onDone: (time: any, type: string) => void;
}

const defaultData = { hour: "00", minute: "00" };

export default function TimePicker({ visible, setVisible, onDone }: PropType) {
  const [time, setTime] = useState(defaultData);
  const { hour, minute } = time;

  const handleScroll = (item: number, id: string) => {
    setTime({ ...time, [id]: item.toString() });
  };

  return (
    <Modal
      type={0}
      visible={visible[0]}
      onAccept={() => {
        onDone(`${hour}:${minute}`, visible[1]);
        setTime(defaultData);
      }}
      onCancel={() => setTime(defaultData)}
      setVisible={(res) => setVisible([res, ""])}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 30,
          width: "100%",
        }}
      >
        <ScrollPicker
          items={Array.from(new Array(24).keys()).map((i) =>
            i.toString().padStart(2, "0")
          )}
          onScroll={handleScroll}
          id="hour"
        />
        <Text>:</Text>
        <ScrollPicker
          items={Array.from(new Array(60).keys()).map((i) =>
            i.toString().padStart(2, "0")
          )}
          onScroll={handleScroll}
          id="minute"
        />
      </View>
    </Modal>
  );
}
