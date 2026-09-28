import { View, Text, TouchableOpacity } from "react-native";

type PillToggleOption = {
  label: string;
  value: string;
};

type PillToggleProps = {
  options: PillToggleOption[];
  selectedValue: string | null;
  onSelect: (value: string) => void;
};

export default function PillToggle({ options, selectedValue, onSelect }: PillToggleProps) {
  return (
    <View className="flex-row flex-wrap gap-3">
      {options.map((option) => {
        const isSelected = option.value === selectedValue;
        return (
          <TouchableOpacity
            key={option.value}
            onPress={() => onSelect(option.value)}
            activeOpacity={0.7}
            className={`px-5 py-2.5 rounded-full border ${
              isSelected ? "border-petora-orange bg-petora-orangeTint" : "border-petora-line bg-white"
            }`}
          >
            <Text
              className={`font-medium ${
                isSelected ? "text-petora-orange" : "text-petora-inkMuted"
              }`}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}   