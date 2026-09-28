import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { mockPets } from "../../data/mockPets";
import colors from "../../theme/colors";

function SpeciesIcon({ species, size = 60 }: { species: string; size?: number }) {
    const color = colors.navy;
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

function DetailRow({ label, value }: { label: string; value: string }) {
    return (
        <View className="flex-row justify-between py-3 border-b border-petora-line">
            <Text className="text-petora-inkMuted">{label}</Text>
            <Text className="text-petora-navy font-semibold">{value}</Text>
        </View>
    );
}

export default function PetDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();

    const pet = mockPets.find((p) => p.id === id);

    if (!pet) {
        return (
            <View className="flex-1 items-center justify-center bg-white px-6">
                <Text className="text-lg font-bold text-petora-navy mb-2">Pet not found</Text>
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="border border-petora-orange rounded-full px-6 py-3 mt-4"
                >
                    <Text className="text-petora-orange font-semibold">Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView className="flex-1 bg-petora-alice">
            {/* Header */}
            <View className="flex-row items-center px-4 pt-14 pb-4">
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={26} color={colors.navy} />
                </TouchableOpacity>
                <Text className="ml-3 text-xl font-bold text-petora-navy">Pet Details</Text>
            </View>

            {/* Photo / fallback */}
            <View className="items-center mb-6">
                {pet.photoUrl ? (
                    <Image source={{ uri: pet.photoUrl }} className="w-28 h-28 rounded-full" resizeMode="cover" />
                ) : (
                    <View className="w-28 h-28 rounded-full bg-orange-100 items-center justify-center">
                        <SpeciesIcon species={pet.species} />
                    </View>
                )}
                <Text className="text-2xl font-bold text-petora-navy mt-3">{pet.name}</Text>
            </View>

            {/* Details card */}
            <View className="bg-white rounded-2xl mx-4 p-4 mb-6">
                <DetailRow label="Species" value={pet.species} />
                <DetailRow label="Breed" value={pet.breed} />
                <DetailRow label="Age" value={pet.age} />
                <DetailRow label="Gender" value={pet.gender} />
                {pet.weight && <DetailRow label="Weight" value={`${pet.weight} kg`} />}
                {pet.aggression && <DetailRow label="Aggression" value={pet.aggression} />}
                <DetailRow label="Vaccinated" value={pet.vaccinated ? "Yes" : "No"} />
            </View>

            {/* Actions */}
            <View className="px-4 pb-10">
                <TouchableOpacity className="bg-petora-orange rounded-full py-4 items-center mb-3">
                    <Text className="text-petora-onPrimary font-bold text-base">Edit Pet</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="border border-petora-orange rounded-full py-4 items-center"
                >
                    <Text className="text-petora-orange font-bold text-base">Back</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}