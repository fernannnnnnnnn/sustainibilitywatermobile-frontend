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

const FormLayoutHistory = ({
  source,
  children,
  children2,
  image,
  upperLabel,
  lowerLabel,
  scrollable = false,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
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

          <View style={styles.imageWrapper}>
            <Image
              source={source}
              style={[styles.image, image, !image?.height && { height: 220 }]}
            />
          </View>

          <View style={styles.children}>
            {children}
            {children2}
          </View>
        </ScrollView>
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
    zIndex: 10,
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
    marginTop: 10,
    marginLeft: 20,
    marginBottom: 10,
    zIndex: 20,
  },
  children: {
    top: -60,
    marginBottom: -60,
  },
  imageWrapper: {
    position: "absolute",
    top: 150,
    left: 0,
    width: "100%",
    pointerEvents: "none",
    zIndex: 0,
  },
});

export default FormLayoutHistory;
