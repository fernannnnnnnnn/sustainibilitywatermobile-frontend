import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TextView({ title, data, style }) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{title}</Text>
      <Text style={styles.data}>{data}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start", // default agar teks rata kiri
    marginBottom: 3,
  },
  label: {
    fontSize: 18,
    color: "#fff",
    lineHeight: 20,
  },
  data: {
    fontWeight: "bold",
    fontSize: 21,
    marginBottom: 4,
    color: "#fff",
    paddingHorizontal: 2,
    paddingTop: 3,
  },
});
