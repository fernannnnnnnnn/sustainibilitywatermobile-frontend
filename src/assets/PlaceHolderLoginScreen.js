import { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import mVR1 from "../../assets/picturePng/mVR1.png";
import { Ionicons as Icon } from "@expo/vector-icons"; // atau sesuaikan dengan yang kamu pakai
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";

// Pastikan font sudah dimuat sebelum menampilkan UI

const { width, height } = Dimensions.get("window");

const PlaceHolderSSnextFirst = () => {
  const navigation = useNavigation();
  const slideCurvedRectangle = useRef(new Animated.Value(height)).current;
  const slideAnim = useRef(new Animated.Value(300)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current; // ⬅️ tambahkan ini
  const [showPassword, setShowPassword] = useState(false);

  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Regular": require("../../../assets/fonts/Poppins-Regular.ttf"),
  });

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        delay: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 800,
        delay: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fontsLoaded]);

  useEffect(() => {
    Animated.timing(slideCurvedRectangle, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  }, []); // <-- tambahkan ini

  if (!fontsLoaded) {
    // While fonts are loading, you can display a loading indicator or a splash screen
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading fonts...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#0973FF", "#054599"]}
        style={StyleSheet.absoluteFill}
      />

      <Animated.View
        style={{
          transform: [{ translateY: slideAnim }],
          opacity: opacityAnim,
        }}
      >
        <Image source={mVR1} style={styles.image} resizeMode="contain" />
      </Animated.View>

      <Animated.View
        style={{
          transform: [{ translateY: slideAnim }],
          opacity: opacityAnim,
        }}
      >
        <Text style={styles.welcomeText}>Welcome</Text>
      </Animated.View>

      {/* Rectangle bawah */}
      <Animated.View
        style={[
          styles.curvedRectangle,
          {
            transform: [{ translateY: slideCurvedRectangle }],
          },
        ]}
      >
        <View style={styles.form}>
          <Text style={styles.label}>Username Or Email</Text>
          <TextInput
            style={styles.input}
            placeholder="sustainability@gmail.com"
            placeholderTextColor="#aaa"
          />

          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.inputPass, { flex: 1 }]}
              placeholder="********"
              secureTextEntry={!showPassword}
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color="#555"
              />
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 80 }}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.navigate("MainMenu")}
            >
              <Text style={styles.loginText}>Log In</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.fingerprintText}>
                Use{" "}
                <Text style={{ color: "#407BFF", fontWeight: "bold" }}>
                  Fingerprint
                </Text>{" "}
                To Access
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  curvedRectangle: {
    width: width,
    height: height * 0.73,
    backgroundColor: "#fff",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    justifyContent: "flex-end",
    paddingBottom: 340,
  },
  image: {
    width: 500,
    height: 500,
    right: 105,
    top: 300,
  },
  title: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
  },
  form: {
    flex: 1,
    marginTop: 60,
    backgroundColor: "#fff",
    borderTopLeftRadius: 55,
    borderTopRightRadius: 55,
    padding: 25,
  },
  label: {
    fontFamily: "Poppins-Bold", // <-- pakai Poppins reguler
    fontSize: 14,
    color: "#333",
    marginBottom: 6,
    marginTop: 10,
    left: 15,
  },
  inputPass: {
    fontFamily: "Poppins-Regular",
    backgroundColor: "#EEF2FF",
    borderRadius: 60,
    paddingHorizontal: 5,
    paddingVertical: 12,
    paddingTop: 13,
    fontSize: 14,
    marginBottom: -2,
    textAlignVertical: "center",
  },
  input: {
    fontFamily: "Poppins-Regular",
    backgroundColor: "#EEF2FF",
    borderRadius: 60,
    paddingHorizontal: 15,
    paddingVertical: 12,
    paddingTop: 12,
    marginBottom: 5,
    fontSize: 14,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEF2FF",
    borderRadius: 60,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  loginButton: {
    backgroundColor: "#4C00FF",
    paddingVertical: 10,
    width: 170,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
    borderRadius: 60,
    left: 85,
  },
  loginText: {
    fontFamily: "Poppins-Bold",
    color: "#fff",
    fontSize: 16,
  },
  forgotText: {
    textAlign: "center",
    marginTop: 12,
    fontSize: 13,
    color: "#444",
  },
  fingerprintText: {
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    marginTop: 10,
    fontSize: 13,
    color: "#444",
  },
  orText: {
    textAlign: "center",
    marginVertical: 15,
    color: "#888",
    fontSize: 13,
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginHorizontal: 50,
  },
  welcomeText: {
    fontFamily: "Poppins-Bold",
    fontSize: 26,
    color: "#fff",
    marginTop: 60,
    alignSelf: "center",
    bottom: 120,
    left: 8,
  },
});

export default PlaceHolderSSnextFirst;
