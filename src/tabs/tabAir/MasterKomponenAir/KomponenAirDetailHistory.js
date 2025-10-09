import React, { useState, useRef, useCallback } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";

// Components
import DropDown from "../../../components/DropDown";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import FormLayout from "../../../components/FormLayout";
import TextView from "../../../components/TextView";
// Styles and API
import { stylesB, stylesDetail } from "../../../styles/globalStyles";
import { formatDateOnly } from "../../../Util/Formatting";

const KomponenAirDetailHistory = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id, idcom, name, value, value2 } = route.params;

  console.log(route.params);

  console.log("Sensor ID HISTORY" + String(idcom));
  return (
    <FormLayout
      source={require("../../../assets/picturePng/mVR1.png")}
      image={{
        width: 700,
        height: 450,
        position: "absolute",
        top: 60,
        right: -170,
        zIndex: 0,
      }}
      upperLabel={
        <Text
          style={{
            position: "absolute",
            top: 63,
            bottom: 90,
            width: 100,
            alignSelf: "center",
            fontSize: 24,
            fontWeight: "bold",
            color: "#FFF",
          }}
        >
          Detail History
        </Text>
      }
      lowerLabel={"Welcome To Location Menus."}
    >
      <View style={stylesDetail.formContainer}>
        <Text style={stylesB.title}>Detail History{" " + idcom}</Text>

        <View style={stylesDetail.rectangle}>
          <View style={stylesDetail.containerValue}>
            <TextView title="Lokasi" data={name} />
            <TextView
              title="Tanggal Penggunaan Air"
              data={value || "Tidak ada"}
            />
            <TextView
              title="Tanggal Perpindahan Sensor"
              data={value2 || "Tidak ada"}
            />
          </View>

          <Image
            source={require("../../../assets/picturePng/Town.png")}
            style={{
              position: "absolute",
              top: 97,
              left: 95,
              zIndex: 0,
              height: 400,
              width: 250,
              resizeMode: "contain",
            }}
          />
        </View>
      </View>
    </FormLayout>
  );
};

export default KomponenAirDetailHistory;
