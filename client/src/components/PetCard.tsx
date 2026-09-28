import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pet } from "../data/mockPets";
import colors from "../theme/colors";

function SpeciesIcon({ species }: { species: Pet["species"] }) {
  const color = colors.navy;
  const size = 22;

  switch (species) {
    case "Dog":
      return <MaterialCommunityIcons name="dog" size={size} color={color} />;
    case "Cat":
      return <MaterialCommunityIcons name="cat" size={size} color={color} />;
    case "Bird":
      return <MaterialCommunityIcons name="bird" size={size} color={color} />;
    case "Fish":
      return <Ionicons name="fish" size={size} color={color} />;
    default:
      return <Ionicons name="paw" size={size} color={color} />;
  }
}

type PetCardProps = {
  pet: Pet;
};

export default function PetCard({ pet }: PetCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/pet-detail/${pet.id}` as any);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className="flex-row items-center bg-white rounded-2xl px-3 py-2 mr-3 shadow-sm"
      style={{ minWidth: 150 }}
    >
      {pet.photoUrl ? (
        <Image
          source={{ uri: pet.photoUrl }}
          className="w-12 h-12 rounded-full"
          resizeMode="cover"
        />
      ) : (
        <View className="w-12 h-12 rounded-full bg-orange-100 items-center justify-center">
          <SpeciesIcon species={pet.species} />
        </View>
      )}

      <Text className="ml-3 flex-1 font-semibold text-petora-navy" numberOfLines={1}>
        {pet.name}
      </Text>

      <Ionicons name="chevron-forward" size={18} color={colors.inkMuted} />
    </TouchableOpacity>
  );
}