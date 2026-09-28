import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PillToggle from "../../components/PillToggle";
import colors from "../../theme/colors";
import { StatusBar } from "expo-status-bar";


const PET_TYPE_OPTIONS = [
  { label: "Dog", value: "Dog" },
  { label: "Cat", value: "Cat" },
  { label: "Bird", value: "Bird" },
  { label: "Fish", value: "Fish" },
];

const GENDER_OPTIONS = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
];

const AGGRESSION_OPTIONS = [
  { label: "Low", value: "Low" },
  { label: "Medium", value: "Medium" },
  { label: "High", value: "High" },
];

export default function AddPetScreen() {
  const [name, setName] = useState("");
  const [petType, setPetType] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [aggression, setAggression] = useState<string | null>(null);
  const [vaccinated, setVaccinated] = useState<boolean | null>(null);

  const canSubmit =
    name.trim() && petType && gender && breed.trim() && age.trim() && weight.trim() && aggression && vaccinated !== null;

  const handleSubmit = () => {
    if (!canSubmit) return;
    const newPet = { name, petType, gender, breed, age, weight, aggression, vaccinated };
    console.log("New pet:", newPet);
    // TODO: connect to real pet storage once backend/shared state is set up
  };

  return (
    <>
      <StatusBar style="light" />
      <ScrollView
      className="flex-1 bg-petora-blue"
      contentContainerStyle={{ padding: 16, paddingBottom: 120, alignItems: "center" }}
    >
      <View className="w-full rounded-2xl bg-petora-alice p-5" style={{ maxWidth: 560 }}>
        <Text className="text-2xl font-bold text-petora-navy text-center mb-6">Add a New Pet</Text>

        {/* Photo picker */}
        <View className="items-center mb-6">
          <TouchableOpacity className="w-24 h-24 rounded-full border-2 border-dashed border-petora-blue items-center justify-center">
            <Ionicons name="camera" size={28} color={colors.navy} />
          </TouchableOpacity>
        </View>

        {/* Pet's Name */}
        <Text className="text-sm font-medium text-petora-navy mb-1">
          Pet's Name <Text className="text-petora-orange">*</Text>
        </Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Pet Name"
          className="border border-petora-line rounded-xl px-4 py-3 mb-5 text-petora-navy bg-white"
        />

        {/* Pet Type */}
        <Text className="text-sm font-medium text-petora-navy mb-2">
          Pet Type <Text className="text-petora-orange">*</Text>
        </Text>
        <View className="mb-5">
          <PillToggle options={PET_TYPE_OPTIONS} selectedValue={petType} onSelect={setPetType} />
        </View>

        {/* Gender */}
        <Text className="text-sm font-medium text-petora-navy mb-2">
          Gender <Text className="text-petora-orange">*</Text>
        </Text>
        <View className="mb-5">
          <PillToggle options={GENDER_OPTIONS} selectedValue={gender} onSelect={setGender} />
        </View>

        {/* Breed */}
        <Text className="text-sm font-medium text-petora-navy mb-1">
          Breed <Text className="text-petora-orange">*</Text>
        </Text>
        <TextInput
          value={breed}
          onChangeText={setBreed}
          placeholder="Choose Pet's Breed"
          className="border border-petora-line rounded-xl px-4 py-3 mb-5 text-petora-navy bg-white"
        />

        {/* Age + Weight side by side */}
        <View className="flex-row gap-3 mb-5">
          <View className="flex-1">
            <Text className="text-sm font-medium text-petora-navy mb-1">
              Age <Text className="text-petora-orange">*</Text>
            </Text>
            <TextInput
              value={age}
              onChangeText={setAge}
              placeholder="Months"
              keyboardType="numeric"
              className="border border-petora-line rounded-xl px-4 py-3 text-petora-navy bg-white"
            />
          </View>
          <View className="flex-1">
            <Text className="text-sm font-medium text-petora-navy mb-1">
              Weight <Text className="text-petora-orange">*</Text>
            </Text>
            <TextInput
              value={weight}
              onChangeText={setWeight}
              placeholder="in kg"
              keyboardType="numeric"
              className="border border-petora-line rounded-xl px-4 py-3 text-petora-navy bg-white"
            />
          </View>
        </View>

        {/* Aggression */}
        <Text className="text-sm font-medium text-petora-navy mb-2">
          Aggression <Text className="text-petora-orange">*</Text>
        </Text>
        <View className="mb-5">
          <PillToggle options={AGGRESSION_OPTIONS} selectedValue={aggression} onSelect={setAggression} />
        </View>

        {/* Vaccinated */}
        <Text className="text-sm font-medium text-petora-navy mb-2">
          Vaccinated <Text className="text-petora-orange">*</Text>
        </Text>
        <View className="flex-row gap-6 mb-8">
          <TouchableOpacity
            onPress={() => setVaccinated(true)}
            className="flex-row items-center"
          >
            <View
              className={`w-5 h-5 rounded border mr-2 items-center justify-center ${vaccinated === true ? "border-petora-orange" : "border-petora-line"
                }`}
            >
              {vaccinated === true && <Ionicons name="checkmark" size={14} color={colors.orange} />}
            </View>
            <Text className="text-petora-navy">Yes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setVaccinated(false)}
            className="flex-row items-center"
          >
            <View
              className={`w-5 h-5 rounded border mr-2 items-center justify-center ${vaccinated === false ? "border-petora-orange" : "border-petora-line"
                }`}
            >
              {vaccinated === false && <Ionicons name="checkmark" size={14} color={colors.orange} />}
            </View>
            <Text className="text-petora-navy">No</Text>
          </TouchableOpacity>
        </View>

        {/* Submit */}
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={!canSubmit}
          className={`rounded-full py-4 items-center ${canSubmit ? "bg-petora-orange" : "bg-petora-orangeTint"}`}
        >
          <Text className={`font-bold text-base ${canSubmit ? "text-petora-onPrimary" : "text-petora-navy"}`}>Add Pet</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </>
  );
}