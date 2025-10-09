// components/SensorList.js
import React from "react";
import { View } from "react-native";
import SensorListItem from "./SensorListItem";

const SensorList = ({ data = [] }) => {
  return (
    <View style={{ gap: 10 }}>
      {data.map((item, index) => (
        <SensorListItem
          key={index}
          icon={item.icon}
          name={item.name}
          value={item.value}
          onPress={item.onPress}
        />
      ))}
    </View>
  );
};

export default SensorList;
