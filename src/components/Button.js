import { StyleSheet, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function Button({
  label = "",
  iconName = null,
  onPress = () => {},
  disabled = false,
  classType = "primary",
  iconSize = 20,
  iconColor = { iconColor },
  style = {},
  textStyle = {},
  iconStyle = {},
  ...props
}) {
  // Warna default berdasarkan classType
  const backgroundColors = {
    primary: "#0D47A1",
    secondary: "#ccc",
    danger: "#d32f2f",
    success: "#388e3c",
  };

  const containerStyle = [
    styles.button,
    {
      backgroundColor: backgroundColors[classType] || backgroundColors.primary,
    },
    disabled && styles.disabled,
    style, // custom style dari luar
  ];

  const labelStyle = [styles.label, textStyle]; // custom text style

  const combinedIconStyle = [
    label ? styles.iconWithLabel : styles.icon,
    { color: iconColor, fontSize: iconSize },
    iconStyle, // custom icon style dari luar
  ];

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      disabled={disabled}
      {...props}
    >
      {iconName && <Icon name={iconName} style={combinedIconStyle} />}
      {label !== "" && <Text style={labelStyle}>{label}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    //   flexDirection: "row",
    //   alignItems: "center",
    //   justifyContent: "center",
    //   paddingVertical: 12,
    //   paddingHorizontal: 20,
    //   borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8, // GANTI dari 12 → 8 agar cocok buat tinggi kecil
    paddingHorizontal: 12,
    borderRadius: 10,
    minHeight: 40, // tambahkan untuk batas minimum
    minWidth: 40,
  },

  disabled: {
    opacity: 0.5,
  },
  icon: {
    marginRight: 0,
  },
  iconWithLabel: {
    marginRight: 8,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
