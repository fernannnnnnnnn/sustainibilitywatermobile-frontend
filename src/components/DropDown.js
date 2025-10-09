import React, { forwardRef } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons"; // pastikan kamu install @expo/vector-icons

const DropDown = forwardRef(function DropDown(
  {
    arrData,
    type = "pilih",
    label = "",
    forInput,
    isRequired = false,
    isDisabled = false,
    errorMessage,
    showLabel = true,
    selectedValue,
    onValueChange,
    pickerStyle,
    pickerWrapper,
    ...props
  },
  ref
) {
  let placeholderLabel = "";

  // switch (type) {
  //   case "pilih":
  //     placeholderLabel = "-- Pilih " + label + " --";
  //     break;
  //   case "semua":
  //     placeholderLabel = "-- Semua --";
  //     break;
  //   default:
  //     break;
  // }

  return (
    <View style={styles.container}>
      {showLabel && (
        <Text style={styles.label}>
          {label}
          {isRequired && <Text style={styles.required}> *</Text>}
          {errorMessage && <Text style={styles.error}> {errorMessage}</Text>}
        </Text>
      )}
      <View
        style={[
          styles.pickerWrapper,
          isDisabled && { backgroundColor: "#e0e0e0" },
          errorMessage && { borderColor: "red" },
          pickerWrapper,
        ]}
      >
        <Picker
          ref={ref}
          enabled={!isDisabled}
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={[styles.pickerStyle, pickerStyle]}
          itemStyle={{ color: "black", fontSize: 12 }}
          dropdownIconColor="#000" // hanya untuk Android
          {...props}
        >
          {arrData &&
            arrData.map((data, index) => (
              <Picker.Item
                key={data?.Value ?? index}
                label={data?.Text ?? "Tidak diketahui"}
                value={data?.Value ?? ""}
              />
            ))}
        </Picker>

        {/* Icon di kanan */}
        {/* {Platform.OS === "ios" && (
          <Ionicons
            name="chevron-down"
            size={18}
            color="#555"
            style={styles.icon}
          />
        )} */}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  required: {
    color: "red",
  },
  error: {
    color: "red",
    fontWeight: "normal",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    position: "relative",
    justifyContent: "center",
  },
  pickerStyle: {
    width: "100%",
    color: "#000",
  },
  icon: {
    position: "absolute",
    right: 10,
    top: "50%",
    marginTop: -9, // untuk tengah vertikal
    pointerEvents: "none",
  },
});

export default DropDown;
