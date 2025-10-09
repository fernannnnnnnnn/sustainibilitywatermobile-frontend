import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Platform, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function PilihLokasiScreen() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const id = route.params?.id || "";
  const fromScreen = route.params?.from || "KomponenAirAdd";

  useEffect(() => {
    const getLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Izin lokasi ditolak");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    };

    getLocationPermission();
  }, []);

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  };

  const handlePilihLokasi = () => {
    if (selectedLocation) {
      navigation.navigate(fromScreen, { lokasi: selectedLocation, id: id });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: currentLocation?.latitude || -6.3485,
          longitude: currentLocation?.longitude || 107.1484,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        onPress={handleMapPress}
      >
        {selectedLocation && (
          <Marker coordinate={selectedLocation} title="Lokasi Dipilih" />
        )}
        {currentLocation && (
          <Marker
            coordinate={currentLocation}
            title="Lokasi Saya"
            pinColor="blue"
          />
        )}
      </MapView>

      {selectedLocation && (
        <View style={styles.bottomSheet}>
          <Text style={styles.text}>Latitude: {selectedLocation.latitude}</Text>
          <Text style={styles.text}>
            Longitude: {selectedLocation.longitude}
          </Text>
          <Button title="Gunakan Lokasi Ini" onPress={handlePilihLokasi} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
    padding: 16,
    elevation: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
});
