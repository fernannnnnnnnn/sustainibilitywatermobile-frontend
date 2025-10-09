import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import SplashSloading from "../../assets/picturePng/SplashSloading.png";
import AstraLogo from "../../assets/picturePng/AstraLogo.png";
import AstraBanner from "../../assets/picturePng/AstraBanner.png";
import M2kiri from "../../assets/picturePng/mahasiswa2kiri.png";
import M1TA from "../../assets/picturePng/mahasiwa1TA.png";
import M3kanan from "../../assets/picturePng/mahasiswa3kanan.png";
import M4TB from "../../assets/picturePng/mahasiswa4TB.png";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const PlaceHolderSplashScreen = () => {
  const navigation = useNavigation();
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [hideSpinner, setHideSpinner] = useState(false);
  const [showSpinner, setShowSpinner] = useState(true);
  const translateXAnim = useRef(new Animated.Value(0)).current;
  const bannerOpacity = useRef(new Animated.Value(0)).current;

  const M2kiriAnim = useRef(new Animated.ValueXY({ x: -200, y: 0 })).current;
  const M1TAAnim = useRef(new Animated.ValueXY({ x: 0, y: 200 })).current;
  const M3kananAnim = useRef(new Animated.ValueXY({ x: 200, y: 0 })).current;
  const M4TBAnim = useRef(new Animated.ValueXY({ x: 0, y: 200 })).current;

  const M2kiriOpacity = useRef(new Animated.Value(0)).current;
  const M1TAOpacity = useRef(new Animated.Value(0)).current;
  const M3kananOpacity = useRef(new Animated.Value(0)).current;
  const M4TBOpacity = useRef(new Animated.Value(0)).current;

  const fadeOutAnim = useRef(new Animated.Value(1)).current;
  const combinedOpacity = Animated.multiply(fadeOutAnim, bannerOpacity);
  const M2kiriCombinedOpacity = Animated.multiply(M2kiriOpacity, fadeOutAnim);
  const M1TACombinedOpacity = Animated.multiply(M1TAOpacity, fadeOutAnim);
  const M4TBCombinedOpacity = Animated.multiply(M4TBOpacity, fadeOutAnim);
  const M3kananCombinedOpacity = Animated.multiply(M3kananOpacity, fadeOutAnim);
  useEffect(() => {
    // animasi berputar
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 3,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();

    // animasi membesar setelah 3 detik
    setTimeout(() => {
      Animated.timing(scaleAnim, {
        toValue: 30,
        duration: 2000,
        useNativeDriver: false,
      }).start(() => setHideSpinner(true));
    }, 2800);
  }, []);

  useEffect(() => {
    // animasi putar
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 3,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();

    // sembunyikan spinner setelah 2.8 detik
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  setTimeout(() => {
    Animated.timing(scaleAnim, {
      toValue: 30,
      duration: 2000,
      useNativeDriver: false,
    }).start(() => {
      setHideSpinner(true);

      // Jalankan animasi geser logo ke kiri setelah lingkaran full
      Animated.timing(translateXAnim, {
        toValue: -width / 4, // geser ke kiri 1/4 layar
        duration: 800,
        delay: 700,
        useNativeDriver: true,
      }).start();
    });
  }, 2800);

  setTimeout(() => {
    Animated.timing(scaleAnim, {
      toValue: 30,
      duration: 2000,
      useNativeDriver: false,
    }).start(() => {
      // Setelah lingkaran selesai membesar, geser AstraLogo
      Animated.timing(translateXAnim, {
        toValue: -width / 4,
        duration: 1000,
        delay: 500,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(bannerOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          // Setelah AstraBanner muncul, animasikan 4 gambar
          Animated.parallel([
            Animated.timing(M2kiriOpacity, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(M2kiriAnim, {
              toValue: { x: 0, y: 0 },
              duration: 1000,
              useNativeDriver: true,
            }),

            Animated.timing(M1TAOpacity, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(M1TAAnim, {
              toValue: { x: 0, y: 0 },
              duration: 1000,
              useNativeDriver: true,
            }),

            Animated.timing(M3kananOpacity, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(M3kananAnim, {
              toValue: { x: 0, y: 0 },
              duration: 1000,
              useNativeDriver: true,
            }),

            Animated.timing(M4TBOpacity, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(M4TBAnim, {
              toValue: { x: 0, y: 0 },
              duration: 1000,
              useNativeDriver: true,
            }),
          ]).start(() => {
            setTimeout(() => {
              // Fade out semua elemen
              Animated.timing(fadeOutAnim, {
                toValue: 0,
                duration: 700,
                useNativeDriver: true,
              }).start(() => {
                navigation.navigate("UntilNext");
              });
            }, 700);
          });
        });
      });
    });
  }, 2800);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 3],
    outputRange: ["0deg", "1080deg"],
  });

  return (
    <View style={styles.container}>
      {/* Gradient background, tetap ada di belakang */}

      <LinearGradient
        colors={["#4c669f", "#3b5998", "#192f6a"]}
        style={StyleSheet.absoluteFill}
      />

      {/* Lingkaran putih membesar */}
      <Animated.View
        style={[
          styles.whiteCircle,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      />

      {showSpinner && (
        <Animated.Image
          source={SplashSloading}
          style={[styles.spinner, { transform: [{ rotate: spin }] }]}
        />
      )}

      {/* AstraLogo dengan animasi geser */}
      <Animated.Image
        source={AstraLogo}
        style={[
          styles.logo,
          { opacity: fadeOutAnim, transform: [{ translateX: translateXAnim }] },
        ]}
        resizeMode="contain"
      />

      {/* AstraBanner muncul setelah logo selesai geser */}
      <Animated.Image
        source={AstraBanner}
        style={[
          styles.banner,
          {
            opacity: combinedOpacity,
            position: "absolute",
            left: width / 2 + 10, // posisikan di kanan tengah
            top: height / 2 - 25, // sesuaikan dengan tinggi
          },
        ]}
        resizeMode="contain"
      />
      <Animated.Image
        source={M2kiri}
        style={{
          position: "absolute",
          width: 300,
          height: 330,
          left: width / 2 - 250,
          bottom: 0, // ganti dari top ke bottom agar lebih fleksibel
          opacity: M2kiriCombinedOpacity,
          transform: M2kiriAnim.getTranslateTransform(),
          zIndex: 2, // tampil di bawah
        }}
        resizeMode="contain"
      />

      <Animated.Image
        source={M1TA}
        style={{
          position: "absolute",
          width: 300,
          height: 330,
          left: width / 2 - 135,
          bottom: 85, // dinaikkan 10px dari sebelumnya
          opacity: M1TACombinedOpacity,
          transform: M1TAAnim.getTranslateTransform(),
          zIndex: 1, // tampil di atas jika perlu
        }}
        resizeMode="contain"
      />
      <Animated.Image
        source={M4TB}
        style={{
          position: "absolute",
          width: 300,
          height: 330,
          left: width / 2 - 145,
          bottom: 0, // tetap atau sesuaikan bila perlu
          opacity: M4TBCombinedOpacity,
          transform: M4TBAnim.getTranslateTransform(),
          zIndex: 4, // tampil di bawah
        }}
        resizeMode="contain"
      />
      <Animated.Image
        source={M3kanan}
        style={{
          position: "absolute",
          width: 320,
          height: 350,
          left: width / 2,
          bottom: -1,
          opacity: M3kananCombinedOpacity,
          transform: M3kananAnim.getTranslateTransform(),
          zIndex: 3, // tampil di bawah
        }}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  whiteCircle: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 80,
    backgroundColor: "white",
  },
  spinner: {
    width: 125,
    height: 125,
    position: "absolute",
  },
  logo: {
    width: 50,
    height: 50,
    position: "absolute",
    left: width / 2 - 25, // awal di tengah
    top: height / 2 - 25,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1,
  },
  banner: {
    width: 170,
    height: 50,
    marginLeft: -70,
  },
});

export default PlaceHolderSplashScreen;
