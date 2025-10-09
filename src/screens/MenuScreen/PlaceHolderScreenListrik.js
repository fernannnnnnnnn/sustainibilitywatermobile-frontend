import React from "react";
import { View, Text } from "react-native"; // tambahkan Text!
import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";
import { useTranslation } from "react-i18next";

const PlaceholderScreenSetting = () => {
  const { t } = useTranslation();

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <LinearGradient
        colors={["#0973FF", "#054599"]}
        style={{
          flex: 1,
          padding: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LottieView
          source={require("../../assets/lottieAnimation/Error404Page_Loading.json")}
          autoPlay
          loop
          style={{ width: 250, height: 250 }}
        />
        <Text style={{ color: "#fff", marginTop: 16, fontSize: 16 }}>
          {t("loading")}
        </Text>
      </LinearGradient>
    </View>
  );
};

export default PlaceholderScreenSetting;
