// components/tabs/LokasiSensorTab.js
import { View, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ButtonAdd from "../../../components/ButtonAdd";
import styles from "../../../styles/globalStyles"; // atau sesuaikan
import EvaluasiTargetPng from "../../../assets/picturePng/EvaluasiTarget.png";
import SensorListStatus from "../../../components/SensorListStatus";
import InfoCard from "../../../components/InfoCard";
import { useState, useEffect, use } from "react";
import { postUser } from "../../../services/apiService";
import Paging from "../../../components/Paging";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

const KontrolKomponenAirDetail = ({}) => {};

export default KontrolKomponenAirDetail;
