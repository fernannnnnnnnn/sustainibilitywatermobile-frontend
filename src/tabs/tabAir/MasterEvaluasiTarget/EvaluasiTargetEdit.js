import React, { useState, useRef, useEffect } from "react";
import LottieView from "lottie-react-native";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
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
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import DropDown from "../../../components/DropDown";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import DropDownForm from "../../../components/DropDownForm";
import FormLayout from "../../../components/FormLayout";
import { stylesB } from "../../../styles/globalStyles";
import * as yup from "yup";
import { validateAllInputs, validateInput } from "../../../Util/ValdiationForm";
import { postUser } from "../../../services/apiService";

const EvaluasiTargetEdit = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params || {};
  console.log("edit id :" + id);

  const months = [
    { Value: "01", Text: "Januari" },
    { Value: "02", Text: "Februari" },
    { Value: "03", Text: "Maret" },
    { Value: "04", Text: "April" },
    { Value: "05", Text: "Mei" },
    { Value: "06", Text: "Juni" },
    { Value: "07", Text: "Juli" },
    { Value: "08", Text: "Agustus" },
    { Value: "09", Text: "September" },
    { Value: "10", Text: "Oktober" },
    { Value: "11", Text: "November" },
    { Value: "12", Text: "Desember" },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => ({
    Value: (currentYear + i).toString(),
    Text: (currentYear + i).toString(),
  }));

  const [errors, setErrors] = useState({});
  const [isError, setIsError] = useState({ error: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [bulan, setBulan] = useState("");
  const [tahun, setTahun] = useState("");

  const formDataRef = useRef({
    idEvaluasiTarget: "",
    jumlahIndividu: "",
    targetBulananIndividu: "",
    persentaseTargetPenghematan: "",
    tanggalMulaiBerlaku: "",
  });

  const userSchema = yup.object({
    idEvaluasiTarget: yup.string().required("Harus diisi"),
    jumlahIndividu: yup
      .string()
      .required("Harus diisi")
      .matches(/^\d+$/, "Harus berupa angka")
      .test(
        "maxValue",
        "Jumlah individu tidak boleh lebih dari 100.000",
        (value) => value <= 100000
      ),
    targetBulananIndividu: yup
      .string()
      .required("Harus diisi")
      .matches(/^\d+$/, "Harus berupa angka")
      .test(
        "maxValue",
        "Target bulanan individu tidak boleh lebih dari 100",
        (value) => value <= 100
      ),
    persentaseTargetPenghematan: yup
      .string()
      .required("Harus diisi")
      .matches(/^\d+$/, "Harus berupa angka")
      .test(
        "maxValue",
        "Persentase target penghematan tidak boleh lebih dari 100",
        (value) => value <= 100
      ),
    bulan: yup.string().required("Harus dipilih"),
    tahun: yup.string().required("Harus dipilih"),
    tanggalMulaiBerlaku: yup
      .string()
      .required("Tanggal mulai berlaku harus diisi"),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await postUser(
          "MasterEvaluasiTarget/GetDataEvaluasiTargetById",
          {
            idEvaluasiTarget: id,
          }
        );

        if (data === "ERROR" || data.length === 0) {
          throw new Error(
            "Terjadi kesalahan: Gagal mengambil data evaluasi target."
          );
        }

        formDataRef.current = { ...formDataRef.current, ...data[0] };
        console.log("Isi formDataRef setelah update:", formDataRef.current);

        const [year, month] = data[0].tanggalMulaiBerlaku.split("-");
        setBulan(month);
        setTahun(year);
        formDataRef.current.bulan = month;
        formDataRef.current.tahun = year;
      } catch (error) {
        setIsError({ error: true, message: error.message });
      }
    };

    fetchData();
  }, []);

  const handleInputChange = async (name, value) => {
    if (name === "jumlahIndividu" && value.length > 6) return;
    if (
      ["targetBulananIndividu", "persentaseTargetPenghematan"].includes(name) &&
      value.length > 3
    )
      return;

    const numericValue = [
      "jumlahIndividu",
      "targetBulananIndividu",
      "persentaseTargetPenghematan",
    ].includes(name)
      ? value.replace(/\D/g, "")
      : value;

    formDataRef.current[name] = numericValue;

    const validationError = await validateInput(name, numericValue, userSchema);
    setErrors((prev) => ({
      ...prev,
      [validationError.name]: validationError.error,
    }));
  };

  const handleEdit = async () => {
    formDataRef.current.bulan = bulan;
    formDataRef.current.tahun = tahun;
    formDataRef.current.tanggalMulaiBerlaku = `${tahun}-${bulan}-01`;

    const validationErrors = await validateAllInputs(
      formDataRef.current,
      userSchema,
      setErrors
    );

    if (Object.values(validationErrors).every((error) => !error)) {
      setIsError({ error: false, message: "" });
      setErrors({});
      setIsLoading(true);
      try {
        delete formDataRef.current.bulan;
        delete formDataRef.current.tahun;

        const data = await postUser(
          "MasterEvaluasiTarget/EditEvaluasiTarget",
          formDataRef.current
        );
        if (data === "ERROR") {
          throw new Error("Gagal menyimpan data target.");
        }

        Alert.alert("Sukses", "Data target berhasil diubah", [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]);
      } catch (error) {
        setIsError({ error: true, message: error.message });
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Gunakan isLoading dan isError untuk mengontrol tampilan
  if (isLoading) {
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
    <FormLayout
      source={require("../../../assets/picturePng/EvaluasiTarget.png")}
    >
      <View style={stylesB.formContainer}>
        <Text style={stylesB.title}>{t("edit_target_evaluation")}</Text>

        <Input
          label={t("number_of_individuals")}
          keyboardType="numeric"
          value={String(formDataRef.current.jumlahIndividu)}
          onChangeText={(text) => handleInputChange("jumlahIndividu", text)}
          errorMessage={errors.jumlahIndividu}
        />

        <Input
          label={t("montyly_target_individuals")}
          keyboardType="numeric"
          value={formDataRef.current.targetBulananIndividu}
          onChangeText={(text) =>
            handleInputChange("targetBulananIndividu", text)
          }
          errorMessage={errors.targetBulananIndividu}
        />
        <DropDownForm
          label={t("month_evaluation")}
          arrData={months}
          selectedValue={bulan}
          onValueChange={async (value) => {
            setBulan(value);
            const validationError = await validateInput(
              "bulan",
              value,
              userSchema
            );
            setErrors((prev) => ({
              ...prev,
              bulan: validationError.error,
            }));
          }}
          isRequired={true}
          type="pilih"
          errorMessage={errors.bulan}
        />

        <DropDownForm
          label={t("year_evaluation")}
          arrData={years}
          selectedValue={tahun}
          onValueChange={async (value) => {
            setTahun(value);
            const validationError = await validateInput(
              "tahun",
              value,
              userSchema
            );
            setErrors((prev) => ({
              ...prev,
              tahun: validationError.error,
            }));
          }}
          isRequired={true}
          type="select"
          errorMessage={errors.tahun}
        />

        <Input
          label={t("persentage_of_savings_target")}
          keyboardType="numeric"
          value={String(formDataRef.current.persentaseTargetPenghematan)}
          onChangeText={(text) =>
            handleInputChange("persentaseTargetPenghematan", text)
          }
          errorMessage={errors.persentaseTargetPenghematan}
        />
      </View>
      <View style={stylesB.buttonGroup}>
        <Button
          label={t("cancel")}
          onPress={() => navigation.goBack()}
          classType="success"
          style={{
            paddingVertical: 12,
            paddingHorizontal: 24,
            alignItems: "center",
            flex: 1,
            marginHorizontal: 4,
            backgroundColor: "#fff",
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 20,
            alignItems: "center",
            flex: 1,
            marginHorizontal: 4,
            borderWidth: 1, // outline
            borderColor: "#0973FF", // warna outline (misalnya hitam)
          }}
          textStyle={{ color: "#0973FF", fontWeight: "bold" }}
        />

        <Button
          label={t("save")}
          onPress={handleEdit}
          classType="success"
          style={{
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 20,
            alignItems: "center",
            flex: 1,
            marginHorizontal: 4,
            backgroundColor: "#0973FF",
            paddingVertical: 12,
            paddingHorizontal: 24,
            alignItems: "center",
            flex: 1,
            marginHorizontal: 4,
          }}
          textStyle={{ color: "#fff", fontWeight: "bold" }}
        />
      </View>
    </FormLayout>
  );
};

export default EvaluasiTargetEdit;
