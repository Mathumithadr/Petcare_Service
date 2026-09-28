import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Pet } from "../data/mockPets";
import { Service } from "../data/mockServices";
import { Provider } from "../data/mockProviders";
import PillToggle from "./PillToggle";
import colors from "../theme/colors";

export type MatchPreference = "nearest" | "lowest-cost";

type BookingFormProps = {
  service: Service | null;
  pet: Pet | null;
  provider?: Provider | null;
  initialValues?: {
    date: string;
    time: string;
    address: string;
    notes: string;
  };
  onConfirm: (details: {
    date: string;
    time: string;
    address: string;
    notes: string;
    preference?: MatchPreference;
  }) => void;
  onBack: () => void;
};

const PREFERENCE_OPTIONS = [
  { label: "Nearest", value: "nearest" },
  { label: "Lowest Cost", value: "lowest-cost" },
];

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between py-1.5">
      <Text className="text-petora-inkMuted text-sm">{label}</Text>
      <Text className="text-petora-navy text-sm font-medium">{value}</Text>
    </View>
  );
}

export default function BookingForm({
  service,
  pet,
  provider,
  initialValues,
  onConfirm,
  onBack,
}: BookingFormProps) {
  const [date, setDate] = useState(initialValues?.date ?? "");
  const [time, setTime] = useState(initialValues?.time ?? "");
  const [address, setAddress] = useState(initialValues?.address ?? "");
  const [notes, setNotes] = useState(initialValues?.notes ?? "");
  const [preference, setPreference] = useState<MatchPreference | null>(null);

  const needsPreference = !provider;
  const isEditing = !!initialValues;

  const canConfirm =
    date.trim() && time.trim() && address.trim() && (!needsPreference || preference || isEditing);

  const handleConfirm = () => {
    if (!canConfirm) return;
    onConfirm({
      date,
      time,
      address,
      notes,
      preference: needsPreference && !isEditing ? preference! : undefined,
    });
  };

  return (
    <View className="bg-white rounded-t-3xl p-6 pt-8">
      <View className="w-10 h-1 bg-petora-orange rounded-full self-center mb-6" />

      <Text className="text-2xl font-bold text-petora-navy text-center mb-4">
        {isEditing ? "Reschedule Booking" : "Booking Details"}
      </Text>

      {/* Overview / summary */}
      <View className="bg-petora-orangeTint rounded-2xl p-4 mb-4">
        <View className="flex-row items-center mb-1">
          <Ionicons name="paw" size={16} color={colors.orange} />
          <Text className="ml-2 text-petora-navy font-medium">
            {pet ? pet.name : "No pet selected"}
          </Text>
        </View>
        <View className="flex-row items-center mb-1">
          <Ionicons name="briefcase" size={16} color={colors.orange} />
          <Text className="ml-2 text-petora-navy font-medium">
            {service ? service.name : "No service selected"}
          </Text>
        </View>
        {provider && (
          <View className="flex-row items-center">
            <Ionicons name="storefront" size={16} color={colors.orange} />
            <Text className="ml-2 text-petora-navy font-medium">{provider.name}</Text>
          </View>
        )}
      </View>

      {/* Pet Details card */}
      {pet && (
        <View className="border border-petora-line rounded-2xl p-4 mb-6">
          <Text className="text-sm font-semibold text-petora-orange mb-2">
            Pet Details (from profile)
          </Text>
          <DetailRow label="Species" value={pet.species} />
          <DetailRow label="Breed" value={pet.breed} />
          <DetailRow label="Age" value={pet.age} />
          <DetailRow label="Gender" value={pet.gender} />
          {pet.weight && <DetailRow label="Weight" value={`${pet.weight} kg`} />}
          {pet.aggression && <DetailRow label="Aggression" value={pet.aggression} />}
          <DetailRow label="Vaccinated" value={pet.vaccinated ? "Yes" : "No"} />
        </View>
      )}

      {/* Form fields */}
      <Text className="text-sm font-medium text-petora-navy mb-1">Date *</Text>
      <TextInput
        value={date}
        onChangeText={setDate}
        placeholder="e.g. 20 Aug 2026"
        className="border border-petora-line rounded-xl px-4 py-3 mb-4 text-petora-navy"
      />

      <Text className="text-sm font-medium text-petora-navy mb-1">Time *</Text>
      <TextInput
        value={time}
        onChangeText={setTime}
        placeholder="e.g. 4:00 PM"
        className="border border-petora-line rounded-xl px-4 py-3 mb-4 text-petora-navy"
      />

      <Text className="text-sm font-medium text-petora-navy mb-1">Address *</Text>
      <TextInput
        value={address}
        onChangeText={setAddress}
        placeholder="Service address"
        className="border border-petora-line rounded-xl px-4 py-3 mb-4 text-petora-navy"
      />

      <Text className="text-sm font-medium text-petora-navy mb-1">Notes</Text>
      <TextInput
        value={notes}
        onChangeText={setNotes}
        placeholder="Any special instructions (optional)"
        multiline
        numberOfLines={3}
        className="border border-petora-line rounded-xl px-4 py-3 mb-4 text-petora-navy"
        style={{ textAlignVertical: "top" }}
      />

      {needsPreference && !isEditing && (
        <View className="mb-6">
          <Text className="text-sm font-medium text-petora-navy mb-2">
            How should we match your provider? *
          </Text>
          <PillToggle
            options={PREFERENCE_OPTIONS}
            selectedValue={preference}
            onSelect={(value) => setPreference(value as MatchPreference)}
          />
        </View>
      )}

      <TouchableOpacity
        onPress={handleConfirm}
        disabled={!canConfirm}
        className={`rounded-full py-4 items-center mb-3 ${canConfirm ? "bg-petora-orange" : "bg-petora-orangeTint"
          }`}
      >
        <Text className="text-petora-onPrimary font-bold text-base">
          {isEditing ? "Save Changes" : "Confirm Booking"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onBack} className="rounded-full py-4 items-center border border-petora-orange">
        <Text className="text-petora-orange font-bold text-base">Back</Text>
      </TouchableOpacity>
    </View>
  );
}