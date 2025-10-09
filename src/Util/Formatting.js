import moment from "moment";
import "moment/locale/id";

// Set locale ke Bahasa Indonesia
moment.locale("id");

// Fungsi pemisah ribuan sesuai format Indonesia
export const separator = (input) => {
  if (!input) return "";

  const parsedInput = parseFloat(input.toString().replace(/\./g, ""));
  if (isNaN(parsedInput)) return "";

  return parsedInput.toLocaleString("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};

// Fungsi menghapus titik ribuan
export const clearSeparator = (input) => {
  if (!input) return 0;
  return parseFloat(input.toString().replace(/\./g, "")) || 0;
};

// Format tanggal dengan atau tanpa waktu
export const formatDate = (input, dateOnly = false) => {
  if (!input) return "";
  return dateOnly
    ? moment(input).format("DD MMMM YYYY")
    : moment(input).format("DD MMMM YYYY, HH:mm");
};

// Format hanya tanggal saja
export const formatDateOnly = (input) => {
  if (!input) return "";
  return moment(input).format("DD MMMM YYYY");
};

// Format tanggal lahir dengan nama bulan (contoh: 25-Juni-25)
export const formatTanggalLahir = (isoDateString) => {
  if (!isoDateString) return "";

  const date = new Date(isoDateString);
  const day = String(date.getDate()).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2); // ambil 2 digit terakhir

  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const monthName = monthNames[date.getMonth()]; // getMonth() dari 0-11

  return `${day}-${monthName}-${year}`;
};
