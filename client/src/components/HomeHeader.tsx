import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import colors from "../theme/colors";
import { useBookings } from "../context/BookingsContext";

export default function HomeHeader() {
  const insets = useSafeAreaInsets();
  const { bookings } = useBookings();
  const [showReminders, setShowReminders] = useState(false);

  const reminded = bookings.filter((b) => b.reminder);

  return (
    <View style={{ paddingTop: insets.top + 8 }}>
      <View className="flex-row items-center justify-between px-4 pb-2">
        <View className="w-16">
          <Image
            source={require("../../assets/images/petora_logo.png")}
            style={{ width: 40, height: 40 }}
            resizeMode="contain"
          />
        </View>

        <Text className="text-2xl text-petora-orange" style={{ fontFamily: "JotiOne_400Regular" }}>
          Petora
        </Text>

        <View className="w-16 flex-row items-center justify-end">
          <Pressable className="mr-3" hitSlop={8} onPress={() => setShowReminders((v) => !v)}>
            <MaterialCommunityIcons name="bell" size={24} color={colors.navy} />
            {reminded.length > 0 && (
              <View
                className="absolute -right-1 -top-1 min-w-[16px] h-4 rounded-full bg-petora-orange items-center justify-center px-1"
              >
                <Text className="text-[10px] font-bold text-white">{reminded.length}</Text>
              </View>
            )}
          </Pressable>
          <Pressable hitSlop={8}>
            <MaterialCommunityIcons name="account-circle-outline" size={28} color={colors.navy} />
          </Pressable>
        </View>
      </View>

      {showReminders && (
        <View
          className="absolute right-4 top-16 w-72 rounded-2xl bg-white p-3 border border-petora-line"
          style={{ elevation: 8, shadowColor: "#000", shadowOpacity: 0.15, shadowRadius: 8, zIndex: 50 }}
        >
          <View className="flex-row items-center justify-between mb-2">
            <Text className="font-bold text-petora-navy">Reminders ({reminded.length})</Text>
            <Pressable onPress={() => setShowReminders(false)} hitSlop={8}>
              <MaterialCommunityIcons name="close" size={18} color={colors.inkMuted} />
            </Pressable>
          </View>

          {reminded.length === 0 ? (
            <Text className="text-petora-inkMuted text-sm">No reminders set.</Text>
          ) : (
            reminded.map((b) => (
              <Pressable
                key={b.id}
                onPress={() => {
                  setShowReminders(false);
                  router.push("/(tabs)/schedule");
                }}
                className="flex-row items-center justify-between py-2 border-b border-petora-line last:border-b-0"
              >
                <View>
                  <Text className="font-semibold text-petora-navy text-sm">
                    {b.pet.name} - {b.service.name}
                  </Text>
                  <Text className="text-xs text-petora-inkMuted">
                    {b.date} • {b.time}
                  </Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={18} color={colors.inkMuted} />
              </Pressable>
            ))
          )}
        </View>
      )}
    </View>
  );
}