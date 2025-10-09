import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // atau react-native-vector-icons

const AddButton = ({ onPress, label = "Tambah", style }) => {
  return (
    <TouchableOpacity style={[styles.buttonContainer, style]} onPress={onPress}>
      <View style={styles.circle}>
        <FontAwesome name="plus" size={20} color="white" />
      </View>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0d47a1", // warna biru gelap tombol
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "white",
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default AddButton;
