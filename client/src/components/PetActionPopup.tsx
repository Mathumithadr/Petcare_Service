import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/colors";

type PetActionPopupProps = {
  onAddPet: () => void;
  onViewPets: () => void;
  onClose: () => void;
};

export default function PetActionPopup({ onAddPet, onViewPets, onClose }: PetActionPopupProps) {
  return (
    <View className="bg-white rounded-t-3xl" style={{ height: "50%" }}>
      <View className="w-10 h-1 bg-petora-orange rounded-full self-center mt-3 mb-2" />

      <TouchableOpacity onPress={onClose} className="absolute right-4 top-4 z-10">
        <Ionicons name="close" size={24} color={colors.inkMuted} />
      </TouchableOpacity>

      <View className="flex-1 px-6 pt-10 justify-center">
        <Text className="text-xl font-bold text-petora-navy text-center mb-6">
          What would you like to do?
        </Text>

        <TouchableOpacity
          onPress={onViewPets}
          className="flex-row items-center border border-petora-line rounded-2xl p-4 mb-3"
        >
          <View className="w-11 h-11 rounded-full bg-petora-orangeTint items-center justify-center">
            <Ionicons name="paw" size={20} color={colors.navy} />
          </View>
          <View className="ml-3">
            <Text className="text-base font-semibold text-petora-navy">View My Pets</Text>
            <Text className="text-xs text-petora-inkMuted">See all your registered pets</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onAddPet}
          className="flex-row items-center bg-petora-orange rounded-2xl p-4"
        >
          <View className="w-11 h-11 rounded-full bg-white/20 items-center justify-center">
            <Ionicons name="add" size={22} color={colors.onPrimary} />
          </View>
          <View className="ml-3">
            <Text className="text-base font-semibold text-petora-onPrimary">Add a New Pet</Text>
            <Text className="text-xs text-white/80">Register a new furry friend</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}