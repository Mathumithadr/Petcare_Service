import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Pet } from "../data/mockPets";
import colors from "../theme/colors";

type SelectPetStepProps = {
  pets: Pet[];
  selectedPetId: string | null;
  onSelect: (petId: string) => void;
  onNext: () => void;
  onCancel: () => void;
};

export default function SelectPetStep({
  pets,
  selectedPetId,
  onSelect,
  onNext,
  onCancel,
}: SelectPetStepProps) {
  return (
    <View className="bg-white rounded-t-3xl p-6 pt-8">
      <View className="w-10 h-1 bg-petora-orange rounded-full self-center mb-6" />

      <Text className="text-2xl font-bold text-petora-navy text-center mb-6">
        Select Your Pet
      </Text>

      <View className="flex-row flex-wrap justify-center gap-6 mb-8">
        {pets.map((pet) => {
          const isSelected = pet.id === selectedPetId;
          return (
            <TouchableOpacity
              key={pet.id}
              onPress={() => onSelect(pet.id)}
              activeOpacity={0.7}
              className="items-center"
              style={{ width: 100 }}
            >
              <View className="w-16 h-16 rounded-full bg-orange-100 items-center justify-center mb-2">
                <Ionicons name="paw" size={28} color={colors.navy} />
              </View>
              <View className="flex-row items-center">
                <View
                  className={`w-5 h-5 rounded border mr-2 items-center justify-center ${
                    isSelected ? "border-petora-orange bg-white" : "border-petora-line"
                  }`}
                >
                  {isSelected && <Ionicons name="checkmark" size={14} color={colors.orange} />}
                </View>
                <Text className="text-petora-navy font-medium">{pet.name}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        onPress={onNext}
        disabled={!selectedPetId}
        className={`rounded-full py-4 items-center mb-3 ${
          selectedPetId ? "bg-petora-orange" : "bg-petora-orangeTint"
        }`}
      >
        <Text className="text-petora-onPrimary font-bold text-base">Next</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onCancel}
        className="rounded-full py-4 items-center border border-petora-orange"
      >
        <Text className="text-petora-orange font-bold text-base">Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}