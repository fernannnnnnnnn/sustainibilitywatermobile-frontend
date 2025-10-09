import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // contoh icon pakai react-native-vector-icons

export default function Filter({ children }) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={[styles.button]}
        onPress={() => setVisible(true)}
        activeOpacity={0.7}
      >
        <Icon name="sort" size={20} color="#0d6efd" />
      </TouchableOpacity>

      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setVisible(false)}
        >
          <View style={styles.dropdown}>{children}</View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "",
    alignItems: "center",
    justifyContent: "center",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  dropdown: {
    width: 350, // dari 350 → jadi lebih ramping
    backgroundColor: "white",
    padding: 10, // dari 20 → sedikit lebih kompak
    borderRadius: 8,
    elevation: 5,
  },
});
