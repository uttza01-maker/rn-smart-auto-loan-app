import { Calculator, History, Info } from "lucide-react-native";
import React, { useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function CalculatorScreen() {
  const insets = useSafeAreaInsets();
  const [carPrice, setCarPrice] = useState("");
  const [downPercent, setDownPercent] = useState(20);
  const [term, setTerm] = useState(48);
  const [interest, setInterest] = useState("");

  // Logic การคำนวณเบื้องต้น
  const priceNum = Number(carPrice || 0);
  const interestNum = Number(interest || 0);
  const loanAmount = priceNum - (priceNum * downPercent) / 100;
  const totalInterest = loanAmount * (interestNum / 100) * (term / 12);
  const monthlyPayment = term > 0 ? (loanAmount + totalInterest) / term : 0;

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      {/* 1. Blue Header (ส่วนหัวน้ำเงินโค้งตามภาพ d.PNG) */}
      <View style={[styles.blueHeader, { paddingTop: insets.top + 10 }]}>
        <View style={styles.navBar}>
          <View style={{ width: 40 }} />
          <Text style={styles.navTitle}>Smart Auto Loan</Text>
          <TouchableOpacity style={styles.iconBtn}>
            <Info color="#fff" size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>คำนวณค่างวด</Text>
          <Text style={styles.heroSubtitle}>
            วางแผนการเงินเพื่อรถในฝันของคุณ
          </Text>
        </View>
      </View>

      {/* 2. Main Content (ส่วนการ์ดข้อมูล) */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formCard}>
            {/* Input ราคารถ */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>ราคารถยนต์ (บาท)</Text>
              <TextInput
                style={styles.input}
                placeholder="เช่น 850,000"
                placeholderTextColor="#94a3b8"
                keyboardType="numeric"
                value={carPrice}
                onChangeText={setCarPrice}
              />
            </View>

            {/* เลือกเงินดาวน์ */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>เงินดาวน์ (%)</Text>
              <View style={styles.chipRow}>
                {[15, 20, 25, 30].map((val) => (
                  <TouchableOpacity
                    key={val}
                    onPress={() => setDownPercent(val)}
                    style={[
                      styles.chip,
                      downPercent === val && styles.chipActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        downPercent === val && styles.chipTextActive,
                      ]}
                    >
                      {val}%
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* เลือกระยะเวลา */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>ระยะเวลาผ่อน (งวด)</Text>
              <View style={styles.chipRow}>
                {[48, 60, 72, 84].map((val) => (
                  <TouchableOpacity
                    key={val}
                    onPress={() => setTerm(val)}
                    style={[
                      styles.termChip,
                      term === val && styles.termChipActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.termText,
                        term === val && styles.termTextActive,
                      ]}
                    >
                      {val}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* ดอกเบี้ย */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>ดอกเบี้ยต่อปี (%)</Text>
              <TextInput
                style={styles.input}
                placeholder="เช่น 2.99"
                placeholderTextColor="#94a3b8"
                keyboardType="decimal-pad"
                value={interest}
                onChangeText={setInterest}
              />
            </View>

            {/* แสดงผลลัพธ์แบบ Real-time */}
            {monthlyPayment > 0 && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>ยอดผ่อนชำระต่อเดือน</Text>
                <Text style={styles.resultValue}>
                  ฿
                  {monthlyPayment.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </Text>
              </View>
            )}

            <TouchableOpacity style={styles.calculateBtn} activeOpacity={0.8}>
              <Text style={styles.calculateBtnText}>คำนวณผลลัพธ์</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* 3. Bottom Tab Navigation */}
      <View
        style={[
          styles.bottomTab,
          { paddingBottom: insets.bottom + 10, height: 75 + insets.bottom },
        ]}
      >
        <TouchableOpacity style={styles.tabItem}>
          <View style={styles.activeTabIcon}>
            <Calculator color="#316bf3" size={24} />
          </View>
          <Text style={[styles.tabLabel, { color: "#316bf3" }]}>คำนวณ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <History color="#94a3b8" size={24} />
          <Text style={styles.tabLabel}>ประวัติ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9ff" },

  // หัวสีน้ำเงินโค้ง
  blueHeader: {
    backgroundColor: "#031632",
    height: height * 0.35,
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
    paddingHorizontal: 20,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
  },
  navTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  iconBtn: { padding: 8 },
  heroSection: { marginTop: 20, paddingHorizontal: 10 },
  heroTitle: { color: "#fff", fontSize: 32, fontWeight: "bold" },
  heroSubtitle: { color: "#8293b5", fontSize: 16, marginTop: 4 },

  scrollView: { flex: 1, marginTop: -height * 0.12 },
  scrollContent: { paddingBottom: 120 },

  // การ์ดสีขาว
  formCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 30,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
  },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 15, fontWeight: "600", color: "#44474d", marginBottom: 8 },
  input: {
    height: 55,
    backgroundColor: "#f8fafc",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#031632",
  },
  chipRow: { flexDirection: "row", gap: 10 },
  chip: {
    flex: 1,
    height: 45,
    backgroundColor: "#f0f3ff",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  chipActive: { backgroundColor: "#031632" },
  chipText: { color: "#316bf3", fontWeight: "bold" },
  chipTextActive: { color: "#fff" },

  termChip: {
    flex: 1,
    height: 45,
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    alignItems: "center",
    justifyContent: "center",
  },
  termChipActive: { backgroundColor: "#031632", borderColor: "#031632" },
  termText: { color: "#44474d", fontWeight: "600" },
  termTextActive: { color: "#fff" },

  resultContainer: {
    backgroundColor: "#e7eeff",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  resultLabel: {
    color: "#316bf3",
    fontWeight: "bold",
    fontSize: 13,
    textTransform: "uppercase",
  },
  resultValue: {
    fontSize: 32,
    fontWeight: "900",
    color: "#031632",
    marginTop: 4,
  },

  calculateBtn: {
    backgroundColor: "#316bf3",
    height: 60,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  calculateBtnText: { color: "#fff", fontSize: 18, fontWeight: "bold" },

  // Bottom Tab
  bottomTab: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#f0f3ff",
  },
  tabItem: { flex: 1, alignItems: "center", justifyContent: "center" },
  activeTabIcon: {
    backgroundColor: "#e7eeff",
    paddingHorizontal: 18,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 4,
  },
  tabLabel: { fontSize: 12, fontWeight: "600", color: "#94a3b8" },
});
