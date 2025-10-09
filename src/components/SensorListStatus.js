// components/SensorList.js
import React from "react";
import { View, Text } from "react-native";
import SensorListItem from "./SensorListItem";

const SensorListStatus = ({ data = [] }) => {
  return (
    <View style={{ gap: 10 }}>
      {data.map((item, index) => (
        <View key={index}>
          {/* The actual item card */}
          <SensorListItem
            icon={item.icon}
            name={item.name}
            value={item.value}
            onPress={item.onPress}
            radius={0}
            outline={item.statusColor}
          />
          {/* Label status di kanan bawah */}
          <View
            style={{
              backgroundColor: item.statusColor || "gray",
              paddingHorizontal: 6,
              paddingVertical: 2,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 6,
              width: "40%",
              alignSelf: "flex-end",
              opacity: 1,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 10,
                fontWeight: "bold",
                paddingHorizontal: 14,
                textAlign: "center",
              }}
            >
              {item.status || "Status"}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default SensorListStatus;
