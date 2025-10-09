import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function Paging({
  pageSize,
  pageCurrent,
  totalData,
  navigation,
}) {
  const totalPage = Math.ceil(totalData / pageSize);
  const scrollRef = useRef(null);
  const buttonRefs = useRef({}); // Simpan ref untuk tiap tombol

  const isFirst = pageCurrent === 1;
  const isLast = pageCurrent === totalPage;

  const pageButtons = [];

  // Tombol panah kiri
  if (!isFirst) {
    pageButtons.push(
      <ArrowButton
        key="prev"
        label="‹"
        onPress={() => navigation(pageCurrent - 1)}
      />
    );
  }

  // Halaman pertama
  pageButtons.push(
    <PageButton
      key="first"
      label="1"
      onPress={() => navigation(1)}
      active={pageCurrent === 1}
      buttonRef={(ref) => (buttonRefs.current[1] = ref)}
    />
  );

  // Halaman tengah
  if (pageCurrent > 1 && pageCurrent < totalPage) {
    pageButtons.push(
      <PageButton
        key="current"
        label={pageCurrent.toString()}
        onPress={() => navigation(pageCurrent)}
        active={true}
        buttonRef={(ref) => (buttonRefs.current[pageCurrent] = ref)}
      />
    );
  } else if (pageCurrent === 1 && totalPage > 2) {
    pageButtons.push(
      <PageButton
        key="second"
        label="2"
        onPress={() => navigation(2)}
        active={pageCurrent === 2}
        buttonRef={(ref) => (buttonRefs.current[2] = ref)}
      />
    );
  } else if (pageCurrent === totalPage && totalPage > 2) {
    pageButtons.push(
      <PageButton
        key="beforeLast"
        label={(totalPage - 1).toString()}
        onPress={() => navigation(totalPage - 1)}
        active={false}
        buttonRef={(ref) => (buttonRefs.current[totalPage - 1] = ref)}
      />
    );
  }

  // Halaman terakhir
  if (totalPage > 1) {
    pageButtons.push(
      <PageButton
        key="last"
        label={totalPage.toString()}
        onPress={() => navigation(totalPage)}
        active={pageCurrent === totalPage}
        buttonRef={(ref) => (buttonRefs.current[totalPage] = ref)}
      />
    );
  }

  // Tombol panah kanan
  if (!isLast) {
    pageButtons.push(
      <ArrowButton
        key="next"
        label="›"
        onPress={() => navigation(pageCurrent + 1)}
      />
    );
  }

  // Scroll otomatis ke tombol aktif
  useEffect(() => {
    const activeRef = buttonRefs.current[pageCurrent];
    if (activeRef && scrollRef.current) {
      activeRef.measureLayout(
        scrollRef.current,
        (x) => {
          scrollRef.current.scrollTo({ x: x - 50, animated: true });
        },
        (err) => {
          console.warn("Error scrolling:", err);
        }
      );
    }
  }, [pageCurrent]);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {pageButtons}
      </ScrollView>
    </View>
  );
}

function PageButton({ label, onPress, active, buttonRef }) {
  return (
    <TouchableOpacity
      ref={buttonRef}
      style={[styles.button, active && styles.activeButton]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, active && styles.activeText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function ArrowButton({ label, onPress }) {
  return (
    <TouchableOpacity style={styles.arrowButton} onPress={onPress}>
      <Text style={styles.arrowText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginHorizontal: 5,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#f9f9f9",
  },
  activeButton: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  },
  buttonText: {
    color: "#333",
    fontSize: 14,
  },
  activeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  arrowButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  arrowText: {
    fontSize: 18,
    color: "#007bff",
  },
});
