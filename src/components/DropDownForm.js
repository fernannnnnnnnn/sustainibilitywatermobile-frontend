import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  FlatList,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const DropDownForm = ({
  arrData,
  label,
  selectedValue,
  onValueChange,
  errorMessage,
  isDisabled = false, // ✅ Tambahkan prop disable default false
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const animatedLabel = useRef(
    new Animated.Value(selectedValue ? 1 : 0)
  ).current;

  useEffect(() => {
    Animated.timing(animatedLabel, {
      toValue: selectedValue ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [selectedValue]);

  const handleSelect = (value) => {
    onValueChange(value);
    setModalVisible(false);
  };

  const selectedLabel =
    arrData.find(
      (item) => item.value == selectedValue || item.Value == selectedValue
    )?.label ||
    arrData.find((item) => item.Value == selectedValue)?.Text ||
    "";

  const labelStyle = {
    position: "absolute",
    left: 12,
    backgroundColor: "#fff",
    paddingHorizontal: 4,
    color: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: ["#aaa", "#888"],
    }),
    top: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 8],
    }),
    fontSize: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    zIndex: 1,
  };

  return (
    <View style={[styles.container, { marginBottom: errorMessage ? 6 : 22 }]}>
      <View style={styles.wrapper}>
        <Animated.Text style={labelStyle}>{label}</Animated.Text>

        <TouchableOpacity
          style={[
            styles.selector,
            { borderColor: isDisabled ? "#ccc" : "#555" }, // ⬅️ dinamis borderColor
            errorMessage && styles.selectorError,
            isDisabled && { opacity: 0.6 }, // ⬅️ dinamis opacity
          ]}
          onPress={() => {
            if (isDisabled) return;

            if (!arrData || arrData.length === 0) {
              Alert.alert("Informasi", "Tidak ada data tersedia");
            } else {
              setModalVisible(true);
            }
          }}
          activeOpacity={isDisabled ? 1 : 0.7}
        >
          <View style={styles.valueRow}>
            <Text
              style={[
                selectedLabel ? styles.selectedText : styles.placeholderText,
              ]}
            >
              {selectedLabel || ` ${label.toLowerCase()}`}
            </Text>
            <Ionicons
              name="chevron-down"
              size={20}
              color="#555"
              style={styles.icon}
            />
          </View>
        </TouchableOpacity>
      </View>

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={arrData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => {
                const label = item.label || item.Text;
                const value = item.value || item.Value;

                return (
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() => handleSelect(value)}
                  >
                    <Text>{label}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  wrapper: {
    position: "relative",
  },
  selector: {
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: "#fff",
    minHeight: 50,
  },
  selectorError: {
    borderColor: "red",
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  placeholderText: {
    flex: 1,
    color: "#ccc",
    fontSize: 16,
  },
  selectedText: {
    flex: 1,
    color: "#000",
    fontSize: 15,
  },
  icon: {
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    maxHeight: 300,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  errorText: {
    color: "red",
    marginTop: 2,
    marginLeft: 14,
    fontSize: 13,
  },
});

export default DropDownForm;
