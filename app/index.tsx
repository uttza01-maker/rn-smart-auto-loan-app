import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const carImage = require("../assets/images/car-loan.png");

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/input");
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#031632" />
      <View style={styles.content}>
        <Image source={carImage} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Smart Auto Loan</Text>
        <Text style={styles.subtitle}>วางแผนออกรถฉบับมือโปร</Text>
      </View>
      <Text style={styles.version}>VERSION 2.4.0</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#031632",
    alignItems: "center",
    justifyContent: "center",
  },
  content: { alignItems: "center" },
  logo: { width: width * 0.6, height: width * 0.6, marginBottom: 24 },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "Kanit_700Bold",
  },
  subtitle: {
    fontSize: 18,
    color: "#8293b5",
    marginTop: 8,
    fontFamily: "Kanit_400Regular",
  },
  version: {
    position: "absolute",
    bottom: 40,
    color: "#8293b5",
    opacity: 0.5,
    fontSize: 12,
  },
});

export default Index;
