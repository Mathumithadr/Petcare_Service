import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import PetCard from "./PetCard";
import { Pet } from "../data/mockPets";

type PetCardSliderProps = {
  pets: Pet[];
  title?: string;
};

export default function PetCardSlider({ pets, title = "My Pets" }: PetCardSliderProps) {
  const router = useRouter();

  const handleAddPet = () => {
    router.push("/(tabs)/add-pet" as any);
  };

  return (
    <View className="mt-4">
      {title ? (
        <Text className="text-lg font-bold text-petora-navy mb-2 px-4">{title}</Text>
      ) : null}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {pets.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}

        {/* Trailing Add Pet card */}
        <TouchableOpacity
          onPress={handleAddPet}
          activeOpacity={0.7}
          className="flex-row items-center bg-white rounded-2xl px-3 py-2 mr-3 shadow-sm"
          style={{ minWidth: 150 }}
        >
          <View className="w-12 h-12 rounded-full bg-petora-orange items-center justify-center">
            <Ionicons name="add" size={24} color="white" />
          </View>
          <Text className="ml-3 flex-1 font-semibold text-petora-navy" numberOfLines={1}>
            Add Pet
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}