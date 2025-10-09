import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles/globalStyles";

const SensorListItem = ({
  icon = "💧",
  name,
  value,
  onPress,
  radius,
  outline,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.sensorItem,
        radius !== undefined
          ? { borderBottomRightRadius: radius }
          : { borderBottomRightRadius: 12 },
        outline ? { borderWidth: 2, borderColor: outline } : null,
      ]}
      onPress={onPress}
    >
      <View style={styles.sensorIcon}>
        <Text style={styles.sensorIconText}>{icon}</Text>
      </View>
      <View style={styles.sensorInfo}>
        <Text style={styles.sensorName}>{name}</Text>
        <Text style={styles.sensorStatus}>{value}</Text>
      </View>
      <Text style={styles.sensorArrow}>›</Text>
    </TouchableOpacity>
  );
};

export default SensorListItem;
