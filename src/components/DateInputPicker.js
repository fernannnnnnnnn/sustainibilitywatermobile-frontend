import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Input from "./Input";

const DateInputPicker = ({
  label,
  value,
  onChangeDate,
  errorMessage,
  minimumDate,
  maximumDate,
  isDisable = false,
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const formatDate = (date) => {
    const d = new Date(date);
    const day = ("0" + d.getDate()).slice(-2);
    const month = ("0" + (d.getMonth() + 1)).slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const handleConfirm = (selectedDate) => {
    setShowPicker(false);
    if (selectedDate && !isDisable) {
      const formatted = formatDate(selectedDate);
      onChangeDate(formatted);
    }
  };

  return (
    <View>
      <TouchableOpacity
        disabled={isDisable}
        onPress={() => !isDisable && setShowPicker(true)}
        activeOpacity={isDisable ? 1 : 0.6}
        style={isDisable ? { BorderColor: "#ccc" } : undefined}
      >
        <Input
          label={label}
          value={value}
          editable={false}
          errorMessage={errorMessage}
          isDisabled={isDisable}
        />
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={showPicker}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setShowPicker(false)}
        date={value && !isNaN(new Date(value)) ? new Date(value) : new Date()}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        themeVariant="light" // pastikan datepicker tetap terang
        textColor="#000" // warna teks hitam (khusus iOS)
      />
    </View>
  );
};

export default DateInputPicker;
