// components/EvaluasiFormLayout.js
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const FormLayout = ({
  source,
  children,
  image,
  upperLabel,
  lowerLabel,
  enableScroll = false, // default: scroll tidak digunakan
}) => {
  const navigation = useNavigation();

  const ContentWrapper = enableScroll ? ScrollView : View;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ContentWrapper
          style={styles.scrollContainer}
          contentContainerStyle={{
            paddingBottom: 0, // <-- Ganti dari 40
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>

          <View style={styles.textBlock}>
            <Text style={styles.upperText}>{upperLabel}</Text>
            <Text style={styles.lowerText}>{lowerLabel}</Text>
          </View>

          <Image
            source={source}
            style={[styles.image, image, !image?.height && { height: 220 }]}
          />

          {/* Semua konten ikut ke-scroll */}
          {children}
        </ContentWrapper>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D47A1",
  },
  backButton: {
    marginTop: 40,
    marginLeft: 20,
    zIndex: 1,
  },
  backText: {
    fontSize: 24,
    color: "#fff",
  },
  image: {
    width: "100%",
    resizeMode: "contain",
    alignSelf: "center",
  },
  upperText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
  lowerText: {
    fontSize: 13,
    color: "#fff",
  },
  textBlock: {
    position: "absolute",
    top: 238,
    left: 20,
    zIndex: 20,
  },
  scrollContainer: {
    flexGrow: 1,
  },
});

export default FormLayout;
