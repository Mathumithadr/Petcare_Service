import { useState } from "react";
import { TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../theme/colors";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <View className="mx-4 mt-2 flex-row items-center rounded-full border border-petora-line bg-white px-4 py-2">
      <MaterialCommunityIcons name="magnify" size={20} color={colors.inkMuted} />
      <TextInput
        className="ml-2 flex-1 text-sm"
        placeholder="Search services, providers..."
        placeholderTextColor={colors.inkMuted}
        value={query}
        onChangeText={setQuery}
        returnKeyType="search"
      />
    </View>
  );
}