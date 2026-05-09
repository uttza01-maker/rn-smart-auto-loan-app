import {
  Kanit_400Regular,
  Kanit_600SemiBold,
  Kanit_700Bold,
  useFonts,
} from "@expo-google-fonts/kanit";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { View } from "react-native";

// ป้องกัน Splash Screen หายก่อน Font โหลดเสร็จ
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Kanit_400Regular,
    Kanit_600SemiBold,
    Kanit_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // เมื่อโหลดฟอนต์เสร็จ (หรือเกิด error) ให้ซ่อน Splash Screen
      // เพื่อให้ index.tsx เริ่มรัน Logic หน่วงเวลา 3 วิ ของตัวเอง
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#031632" }}>
      <Stack
        screenOptions={{
          headerShown: false,
          // กำหนด Animation การเปลี่ยนหน้าให้ดู Smooth แบบ Native
          animation: "fade_from_bottom",
          contentStyle: { backgroundColor: "#f9f9ff" }, // สีพื้นหลังมาตรฐาน (Surface)
        }}
      >
        {/* หน้าแรก (Splash/Intro) */}
        <Stack.Screen
          name="index"
          options={{
            contentStyle: { backgroundColor: "#031632" }, // เฉพาะหน้า index ให้พื้นหลังเป็นสีเข้ม
          }}
        />

        {/* หน้ากรอกข้อมูล */}
        <Stack.Screen
          name="input"
          options={{
            gestureEnabled: false, // ป้องกันการรูดกลับไปหน้า Splash
          }}
        />
      </Stack>
    </View>
  );
}
