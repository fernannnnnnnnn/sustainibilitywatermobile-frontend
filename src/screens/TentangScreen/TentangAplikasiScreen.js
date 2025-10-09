import React from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const TentangAplikasi = ({ navigation }) => {
  const { t } = useTranslation();
  return (
    <LinearGradient colors={["#0973FF", "#054599"]} style={styles.container}>
      {/* Tombol Kembali */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={24} color="#FFFFFF" />
        <Text style={styles.backText}>Kembali</Text>
      </TouchableOpacity>

      {/* Konten */}
      <View style={styles.card}>
        <Icon name="eco" size={48} color="#00796B" style={styles.icon} />
        <Text style={styles.title}>{t("about_title")}</Text>
        <Text style={styles.text}>{t("about_text1")}</Text>
        <Text style={styles.text}>{t("about_text2")}</Text>

        <Text style={styles.text}>{t("about_text3")}</Text>
        <Text style={styles.footerText}>{t("about_footer")}</Text>
      </View>
    </LinearGradient>
  );
};

export default TentangAplikasi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems: "center",
  },
  icon: {
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#00796B",
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    color: "#444",
    marginBottom: 10,
    textAlign: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#777",
    marginTop: 12,
    textAlign: "center",
  },
});
