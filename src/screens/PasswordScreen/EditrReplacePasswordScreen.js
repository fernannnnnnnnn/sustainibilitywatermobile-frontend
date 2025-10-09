import React, { useState, useEffect, useCallback } from "react";
import LottieView from "lottie-react-native";
import { useTranslation } from "react-i18next";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
  Alert,
  Dimensions,
  Animated,
} from "react-native";
const { height } = Dimensions.get("window");
import Icon from "react-native-vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import MIpng from "../../assets/picturePng/Manajemen-informatika.png";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { postUser } from "../../services/apiService";
import { APPLICATION_ID } from "../../Util/Constants";
import town from "../../assets//picturePng/Town.png";
import { useNavigation } from "@react-navigation/native";
import waterAnimation from "../../assets/animations/Wave Progress.json";
import { useRef } from "react";

export default function EditReplacePasswordScreen() {
  const { t } = useTranslation();
  const navigate = useNavigation();

  const SCREEN_HEIGHT = Dimensions.get("window").height;

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  const translateY = useRef(new Animated.Value(200)).current; // Mulai dari bawah
  const [playLottie, setPlayLottie] = useState(true);

  const [showTransition, setShowTransition] = useState(false);

  useEffect(() => {
    const getSessionData = async () => {
      try {
        const userJson = await AsyncStorage.getItem("activeUser");
        if (userJson !== null) {
          const parsedUser = JSON.parse(userJson);
          console.log("User dari session:", parsedUser);
          setUser(parsedUser); // simpan ke state
        }
      } catch (error) {
        console.error("Gagal membaca session:", error);
      }
    };

    getSessionData();
  }, []);

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: -50, // hanya naik sampai 30% dari atas
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      setPlayLottie(true); // gelombang mulai loop di posisi ini
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (user === null) {
        console.log("User belum tersedia, menunggu session...");
        return;
      }

      const loadUserProfile = async () => {
        try {
          const data = await postUser("MasterProfile/GetDataProfile", {
            username: user.username,
            role: user.role,
          });

          setUserProfile(data[0]);
        } catch (error) {
          console.error("Gagal mengambil data:", error);
        }
      };

      loadUserProfile();
    }, [user]) // efek hanya dijalankan ulang saat `user` berubah
  );

  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert("Peringatan", "Isi semua kolom password.");
      return;
    }

    if (newPassword.length < 8) {
      Alert.alert("Peringatan", "Password harus minimal 8 karakter.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Gagal", "Konfirmasi password tidak cocok.");
      return;
    }

    try {
      const payload = {
        username: user.username,
        newPassword: newPassword,
      };

      const result = await postUser(
        "MasterProfile/ChangePasswordProfile",
        payload
      );

      const parsed = typeof result === "string" ? JSON.parse(result) : result;

      if (parsed[0]?.Status === "SUCCESS") {
        setNewPassword("");
        setConfirmPassword("");

        // Tampilkan animasi transisi
        setShowTransition(true);

        // Tunggu 2 detik sebelum kembali ke halaman sebelumnya
        setTimeout(() => {
          navigate.goBack();
        }, 3500);
      } else {
        Alert.alert("Gagal", parsed[0]?.Status || "Gagal mengubah password.");
      }
    } catch (error) {
      console.error("Gagal ubah password:", error);
      Alert.alert("Error", "Terjadi kesalahan saat mengubah password.");
    }
  };

  if (!userProfile) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "#fff", marginTop: 100, textAlign: "center" }}>
          Memuat profil...
        </Text>
      </View>
    );
  } else {
    return (
      <LinearGradient
        colors={["#0973FF", "#054599"]}
        style={styles.gradientContainer}
      >
        <Text style={styles.header}>{t("change_password")}</Text>
        <TouchableOpacity
          style={{ bottom: "27", left: "35" }}
          onPress={() => navigate.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={{ width: "100%", alignItems: "center" }}>
          <Image
            source={town}
            style={{ width: 340, height: 340, marginLeft: 30, marginTop: -70 }}
          />
        </View>
        <View style={styles.container}>
          <View style={styles.scrollWrapper}>
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.passwordContainer}>
                <Text style={styles.sectionTitle}>{t("changes_password")}</Text>

                <TextInput
                  placeholder={t("new_Baru")}
                  secureTextEntry
                  style={styles.passwordInput}
                  onChangeText={(text) => setNewPassword(text)}
                />
                <TextInput
                  placeholder={t("confirm_Baru")}
                  secureTextEntry
                  style={styles.passwordInput}
                  onChangeText={(text) => setConfirmPassword(text)}
                />

                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleChangePassword}
                >
                  <Text style={styles.saveButtonText}>
                    {t("save_password")}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
            {!showTransition && (
              <Animated.View
                style={[styles.waterAnimation, { transform: [{ translateY }] }]}
              >
                <LottieView
                  source={waterAnimation}
                  autoPlay
                  loop
                  style={{ width: "100%", height: "100%" }}
                />
              </Animated.View>
            )}
          </View>
          {showTransition && (
            <View style={styles.waterAnimationTransition}>
              <LottieView
                source={waterAnimation}
                autoPlay
                loop
                style={{ width: "360%", height: 1200 }}
              />
            </View>
          )}
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  waterAnimation: {
    position: "absolute",
    left: "-25%", // Lebar ekstra ke kiri
    right: "-25%", // Lebar ekstra ke kanan
    bottom: -50,
    height: 500,
    width: "150%",
    zIndex: -1, // 🟢 ganti dari -1 ke 0 supaya bisa terlihat
    opacity: 1,
  },
  waterAnimationTransition: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 300,
    backgroundColor: "transparent", // biar tetap tembus pandang
    zIndex: 99, // pastikan di atas elemen lain
    justifyContent: "flex-end",
    alignItems: "center",
  },
  passwordContainer: {
    marginTop: 30,
    marginBottom: 40, // Tambahkan ini
    marginHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    paddingRight: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#054599",
  },
  passwordInput: {
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  gradientContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 0,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    paddingBottom: 0,
    textAlign: "center",
    color: "#fff",
    marginTop: 20,
  },
  list: {
    paddingBottom: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 3,
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    backgroundColor: "#D6E9FF",
    padding: 10,
    borderRadius: 30,
    marginRight: 16,
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "red",
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },
  container: {
    position: "absolute",
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    bottom: 0,
    height: height * 0.525, // 60% dari tinggi layar
    width: "100%",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
  },
  scrollWrapper: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    marginTop: -40,
    padding: 10,
    height: height * 0.7 * 0.75,
    overflow: "hidden", // tambahkan ini!
    position: "relative", // supaya absolute anak (Lottie) berfungsi dengan benar
  },
});
