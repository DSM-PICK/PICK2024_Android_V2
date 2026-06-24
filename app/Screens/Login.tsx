import {
  Button,
  Layout,
  Text,
  TextInput,
  View,
  KeyboardDismiss,
} from "@/Components";
import { instance, IUserDetails, IUserLoginIn, IUserLoginOut } from "@/apis";
import { bulkSetItem, getDeviceToken, setItem } from "@/utils";
import { useMyMutation, useToast } from "@/hooks";
import { useState } from "react";

const HelperLink = ({ text, label, onPress, right = false }) => {
  return (
    <View
      style={{
        marginTop: -30,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        gap: 5,
        justifyContent: right ? "flex-end" : "flex-start",
      }}
    >
      <Text colorLevel={900} colorType="gray" fontType="body" fontLevel={1}>
        {text}
      </Text>
      <Text
        onPress={onPress}
        colorLevel={500}
        colorType="main"
        fontType="body"
        fontLevel={1}
        style={{ textDecorationLine: "underline" }}
      >
        {label}
      </Text>
    </View>
  );
};

export const Login = ({ navigation }) => {
  const { mutate } = useMyMutation<IUserLoginIn, IUserLoginOut>(
    "post",
    "user",
    "/login",
  );
  const { error } = useToast();

  const [data, setData] = useState({
    account_id: "",
    password: "",
    os: "AOS" as const,
  });

  const handleChange = (text: string, id: string) => {
    setData({ ...data, [id]: text });
  };

  const handlePress = async () => {
    const token = await getDeviceToken();
    const requestData = token ? { ...data, device_token: token } : data;
    mutate(requestData, {
      onSuccess: async (res) => {
        await bulkSetItem([
          ["access_token", res.access_token],
          ["refresh_token", res.refresh_token],
        ]);
        const { data: userdata } =
          await instance.get<IUserDetails>("/user/details");

        setItem("user_data", `${userdata.account_id}||${userdata.user_name}`);
        navigation.reset({ routes: [{ name: "메인" }] });
      },
      onError: (err) => {
        if (err === 404) {
          error("이메일을 확인해주세요");
        } else if (err === 401) {
          error("비밀번호를 확인해주세요");
        }
      },
    });
  };

  return (
    <KeyboardDismiss>
      <Layout style={{ gap: 40 }}>
        <View style={{ width: "100%", marginTop: 80, gap: 12 }}>
          <Text
            fontType="heading"
            fontLevel={2}
            colorType="normal"
            colorLevel="black"
          >
            <Text
              fontType="heading"
              fontLevel={2}
              colorType="main"
              colorLevel={500}
            >
              PiCK
            </Text>
            에 로그인하기
          </Text>
          <Text fontType="body" fontLevel={1} colorType="gray" colorLevel={600}>
            PiCK 계정으로 로그인 해주세요.
          </Text>
        </View>
        <TextInput
          label="이메일"
          value={data.account_id}
          id="account_id"
          placeholder="학교 이메일을 입력해주세요"
          onChange={handleChange}
          autoComplete="username"
          after={
            <Text
              fontType="caption"
              fontLevel={2}
              colorType="gray"
              colorLevel={400}
            >
              @dsm.hs.kr
            </Text>
          }
        />
        <TextInput
          label="비밀번호"
          value={data.password}
          id="password"
          placeholder="비밀번호를 입력하세요"
          onChange={handleChange}
          password
          autoComplete="password"
        />
        <HelperLink
          text={"비밀번호를 잊어버리셨나요?"}
          label={"비밀번호 변경"}
          onPress={() => navigation.push("비번변경이메일")}
          right
        />

        <View
          style={{ width: "100%", position: "absolute", bottom: 30, gap: 12 }}
        >
          <HelperLink
            text={"PiCK 계정이 없으신가요?"}
            label={"회원가입"}
            onPress={() => navigation.push("회원가입이메일")}
          />
          <Button
            disabled={!!!data.account_id || !!!data.password}
            onPress={() => handlePress()}
          >
            로그인
          </Button>
        </View>
      </Layout>
    </KeyboardDismiss>
  );
};
