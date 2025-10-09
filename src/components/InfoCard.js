// components/InfoCard.js
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ButtonAdd from "./ButtonAdd"; // atau sesuaikan path
import styles from "../styles/globalStyles"; // sesuaikan path
import { MaterialCommunityIcons } from "@expo/vector-icons"; // untuk icon air
import { StyleSheet } from "react-native";

const InfoCard = ({
  subtitle = "Master",
  title = "Lokasi Sensor",
  showButton = true,
  onAddPress = () => {},
  labelButton = "Tambah",
  imageSource,
  imageStyle = { width: 150, height: 150 },
}) => {
  return (
    <LinearGradient
      colors={["#0973FF", "#054599"]}
      style={styles.infoCard}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.infoCardContent}>
        <Text style={styles.infoSubtitle}>{subtitle}</Text>
        <Text style={styles.infoTitle}>{title}</Text>

        <View style={styles.deviceInfoRow}>
          {showButton ? (
            <ButtonAdd
              style={styles.buttonAdd}
              label={labelButton}
              onPress={onAddPress}
            />
          ) : (
            <TouchableOpacity
              style={stylesWater.waterButton}
              onPress={onAddPress}
            >
              <View style={stylesWater.waterIconCircle}>
                <MaterialCommunityIcons name="water" size={20} color="white" />
              </View>
              <Text style={stylesWater.waterButtonText}>{labelButton}</Text>
            </TouchableOpacity>
          )}
          <View style={styles.deviceImagePlaceholder}>
            <Image source={imageSource} style={imageStyle} />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const stylesWater = StyleSheet.create({
  // ...style lain...

  waterButton: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0d47a1",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "white",
  },
  waterIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  waterButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
export default InfoCard;
