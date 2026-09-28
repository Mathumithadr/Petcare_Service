import { Image, Pressable, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "../theme/colors";

export default function HomeHeader() {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-row items-center justify-between px-4 pb-2"
      style={{ paddingTop: insets.top + 8 }}
    >
      <View className="w-16">
   <Image
  source={require("../../assets/images/petora_logo.png")}
  style={{ width: 40, height: 40 }}
  resizeMode="contain"
/>
      </View>

      <Text className="text-2xl text-petora-orange" style={{ fontFamily: 'JotiOne_400Regular' }}>Petora</Text>

      <View className="w-16 flex-row items-center justify-end">
        <Pressable className="mr-3" hitSlop={8}>
          <MaterialCommunityIcons name="bell" size={24} color={colors.navy} />
        </Pressable>
        <Pressable hitSlop={8}>
          <MaterialCommunityIcons name="account-circle-outline" size={28} color={colors.navy} />
        </Pressable>
      </View>
    </View>
  );
}