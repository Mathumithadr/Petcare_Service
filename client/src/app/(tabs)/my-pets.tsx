import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import PetCard from "../../components/PetCard";
import { mockPets } from "../../data/mockPets";
import colors from "../../theme/colors";

export default function MyPetsScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-petora-alice">
      <View className="flex-row items-center justify-between px-4 pt-4 pb-2">
        <Text className="text-2xl font-bold text-petora-navy">My Pets</Text>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/add-pet" as any)}
          className="w-10 h-10 rounded-full bg-petora-orange items-center justify-center"
        >
          <Ionicons name="add" size={22} color={colors.onPrimary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={mockPets}
        keyExtractor={(pet) => pet.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => (
          <View style={{ minWidth: undefined }}>
            <PetCard pet={item} />
          </View>
        )}
        ListEmptyComponent={
          <Text className="text-petora-inkMuted text-center mt-10">
            No pets added yet.
          </Text>
        }
      />
    </View>
  );
}