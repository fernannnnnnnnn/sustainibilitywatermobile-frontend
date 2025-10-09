import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";

const DetailHistoryCard = ({
  icon = "activity", // default icon sensor
  name,
  volume = "",
  duration = "",
  time = new Date(),
  status,
}) => {
  const timeOnly = new Date(time).toTimeString().split(" ")[0];

  return (
    <View style={styles.deviceCard}>
      <View style={styles.deviceLeft}>
        <Icon
          name={"cpu"}
          size={50}
          color="#0971FB"
          style={styles.deviceIcon}
        />
        <View>
          <Text style={styles.deviceLabel}>{name}</Text>

          <View style={styles.infoRow}>
            <Icon
              name="droplet"
              size={14}
              color="#757575"
              style={styles.icon}
            />
            <Text style={styles.infoText}>{volume} L</Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name="clock" size={14} color="#757575" style={styles.icon} />
            <Text style={styles.infoText}>{duration} sec</Text>
          </View>
        </View>
      </View>

      <View style={styles.deviceRight}>
        <Text
          style={[
            styles.statusText,
            status?.toLowerCase() === "normal" ? styles.normal : styles.bocor,
          ]}
        >
          {status === "normal" ? "Normal" : "Bocor"}
        </Text>

        <View style={styles.lastUpdateContainer}>
          <Text style={styles.lastUpdateText}>{"Last : " + timeOnly}</Text>
          <Icon
            name="clock"
            size={12}
            color="#757575"
            style={styles.iconLast}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  deviceCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff", // PUTIH
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  deviceLeft: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  deviceIcon: {
    marginRight: 12,
  },
  deviceLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  icon: {
    marginRight: 6,
  },
  iconLast: {
    marginLeft: 6,
  },
  infoText: {
    fontSize: 12,
    color: "#757575",
  },
  deviceRight: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "bold",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    overflow: "hidden",
    color: "#fff",
  },
  normal: {
    backgroundColor: "#4CAF50",
  },
  bocor: {
    backgroundColor: "#F44336",
  },
  lastUpdateContainer: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  lastUpdateText: {
    fontSize: 12,
    color: "#333",
    fontWeight: "500",
  },
});

export default DetailHistoryCard;
