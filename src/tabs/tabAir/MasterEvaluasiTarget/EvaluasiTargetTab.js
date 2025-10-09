// components/tabs/LokasiSensorTab.js
import { View, Text, Image, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import { useTranslation } from "react-i18next";
import { LinearGradient } from "expo-linear-gradient";
import ButtonAdd from "../../../components/ButtonAdd";
import styles from "../../../styles/globalStyles"; // atau sesuaikan
import EvaluasiTargetPng from "../../../assets/picturePng/EvaluasiTarget.png";
import SensorList from "../../../components/SensorList";
import InfoCard from "../../../components/InfoCard";
import { useState, useEffect, use } from "react";
import { postUser } from "../../../services/apiService";
import Paging from "../../../components/Paging";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

const EvaluasiTargetTab = ({ searchQuery }) => {
  const PAGE_SIZE = 10;
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    page: 1,
    query: searchQuery.query,
    sort: "[Jumlah Individu] asc",
  });

  const [userData, setUserData] = useState(null);
  useEffect(() => {
    // panggil fungsi fetch / reload data berdasarkan searchQuery
    console.log("EvaluasiTargetTab sensor " + searchParams.query);
    console.log("EvaluasiTargetTab sensor " + searchParams.sort);
  }, [searchQuery]);

  useEffect(() => {
    setSearchParams((prev) => ({
      ...prev,
      page: 1,
      query: searchQuery.query,
      sort: searchQuery.sort,
    }));
  }, [searchQuery]);

  useFocusEffect(
    useCallback(() => {
      const loadUser = async () => {
        try {
          setLoading(true);
          console.log("Muat data Evaluasi Target", searchParams);
          const data = await postUser(
            "MasterEvaluasiTarget/GetDataEvaluasiTarget",
            {
              page: searchParams.page,
              query: searchParams.query,
              sort: searchParams.sort,
            }
          ); // kirim body kosong
          setUserData(data);
        } catch (error) {
          console.error("Gagal mengambil data:", error);
        } finally {
          setLoading(false);
        }
      };
      loadUser();
    }, [searchParams])
  );

  function handleSetCurrentPage(newCurrentPage) {
    setSearchParams((prevFilter) => {
      return {
        ...prevFilter,
        page: newCurrentPage,
      };
    });
  }

  if (loading) {
    return (
      <View
        style={[{ flex: 1, justifyContent: "center", alignItems: "center" }]}
      >
        <LottieView
          source={require("../../../assets/lottieAnimation/CuteBoyRunning_Loading.json")}
          autoPlay
          loop
          style={{ width: 150, height: 150 }}
        />
        <Text style={{ color: "#fff", marginTop: 16, fontSize: 16 }}>
          {t("loading")}
        </Text>
      </View>
    );
  }
  return (
    <>
      <InfoCard
        subtitle="Master"
        title={t("target_evaluation")}
        showButton={true}
        labelButton={t("add")}
        onAddPress={() => navigation.navigate("EvaluasiTargetAdd")}
        imageSource={EvaluasiTargetPng}
        imageStyle={{ width: 150, height: 150 }}
      />
      {/* Komponen Paging */}

      <Text style={styles.sectionTitle}>{t("target_evalution_data")}</Text>
      <SensorList
        data={
          userData
            ? userData.map((item, index) => ({
                icon: "💧",
                name: item["Jumlah Individu"] || `Target ${index + 1}`,
                value: item["Target Bulanan Individu"] || "0",
                onPress: () =>
                  navigation.navigate("EvaluasiTargetDetail", {
                    id: item["Key"],
                  }),
              }))
            : []
        }
      />
      <Paging
        pageSize={PAGE_SIZE}
        pageCurrent={searchParams.page}
        totalData={
          userData && userData[0] && userData[0]["Count"]
            ? userData[0]["Count"]
            : 0
        }
        navigation={handleSetCurrentPage}
      />
    </>
  );
};

export default EvaluasiTargetTab;
