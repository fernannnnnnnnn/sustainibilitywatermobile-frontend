import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const HeaderUser = ({
  onLogout,
  photoSource,
  name,
  role,
  customStyles = {},
}) => {
  return (
    <View style={[styles.header, customStyles.header]}>
      <View style={[styles.avatarContainer, customStyles.avatarContainer]}>
        <Image
          source={photoSource}
          style={[styles.avatar, customStyles.avatar]}
        />
        <View style={customStyles.nameContainer}>
          <Text style={[styles.username, customStyles.username]}>{name}</Text>
          <Text style={[styles.position, customStyles.position]}>{role}</Text>
        </View>
      </View>

      <Pressable onPress={onLogout} style={customStyles.logoutButton}>
        <MaterialIcons
          name="logout"
          size={24}
          color={customStyles.logoutIconColor || "white"}
        />
      </Pressable>
    </View>
  );
};

export default HeaderUser;

const styles = StyleSheet.create({
  header: {
    width: "90%",
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#ccc",
    marginRight: 10,
  },
  username: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  position: {
    color: "white",
    fontSize: 12,
    marginTop: 2,
  },
});
