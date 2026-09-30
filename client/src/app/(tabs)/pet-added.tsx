import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../theme/colors";

export default function PetAddedScreen() {
  const { name, species, breed, age, gender, photoUrl } = useLocalSearchParams<{
    name: string;
    species: string;
    breed: string;
    age: string;
    gender: string;
    photoUrl?: string;
  }>();

  return (
    <ScrollView
      className="flex-1 bg-petora-alice"
      contentContainerStyle={{ padding: 16, paddingBottom: 120, alignItems: "center" }}
    >
      <View className="w-full items-center" style={{ maxWidth: 480 }}>
        <View className="mt-6 h-32 w-32 items-center justify-center rounded-full bg-petora-orangeTint">
          <MaterialCommunityIcons name="check-circle" size={72} color={colors.success} />
        </View>

        <Text className="mt-4 text-center text-2xl font-bold text-petora-navy">
          Pet Added Successfully!
        </Text>
        <Text className="mt-2 text-center text-sm text-petora-inkMuted">
          Your pet has been added to Petora.{"\n"}You can now access all the services for your pet.
        </Text>

        <View className="mt-6 w-full rounded-2xl border border-petora-line bg-white p-4">
          <View className="flex-row items-center">
            {photoUrl ? (
              <Image source={{ uri: photoUrl }} style={{ width: 56, height: 56, borderRadius: 28 }} />
            ) : (
              <View className="h-14 w-14 items-center justify-center rounded-full bg-petora-orangeTint">
                <MaterialCommunityIcons name="paw" size={26} color={colors.navy} />
              </View>
            )}
            <View className="ml-3">
              <Text className="text-lg font-semibold text-petora-navy">{name}</Text>
              <Text className="text-sm text-petora-inkMuted">
                {species}
                {age ? `  •  ${age}` : ""}
              </Text>
            </View>
          </View>

          <View className="my-3 h-px bg-petora-line" />

          <View className="flex-row items-center justify-between py-1">
            <View className="flex-row items-center">
              <MaterialCommunityIcons name="paw-outline" size={20} color={colors.inkMuted} />
              <Text className="ml-2 text-sm text-petora-inkMuted">Breed</Text>
            </View>
            <Text className="text-sm font-semibold text-petora-navy">{breed}</Text>
          </View>

          <View className="flex-row items-center justify-between py-1">
            <View className="flex-row items-center">
              <MaterialCommunityIcons
                name={gender === "Female" ? "gender-female" : "gender-male"}
                size={20}
                color={colors.inkMuted}
              />
              <Text className="ml-2 text-sm text-petora-inkMuted">Gender</Text>
            </View>
            <Text className="text-sm font-semibold text-petora-navy">{gender}</Text>
          </View>
        </View>

        <Pressable
          onPress={() => router.replace("/my-pets")}
          className="mt-5 w-full flex-row items-center justify-center rounded-full bg-petora-orange py-4 active:bg-petora-orangePressed"
        >
          <Text className="mr-2 text-base font-semibold text-petora-onPrimary">View My Pets</Text>
          <MaterialCommunityIcons name="arrow-right" size={18} color={colors.onPrimary} />
        </Pressable>

        <Pressable
          onPress={() => router.replace("/add-pet")}
          className="mt-3 w-full items-center rounded-full border border-petora-orange bg-petora-orangeTint py-4"
        >
          <Text className="text-base font-semibold text-petora-navy">Add Another Pet</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}