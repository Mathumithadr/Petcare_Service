import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Service } from "../data/mockServices";
import colors from "../theme/colors";

type ServiceCardProps = {
  service: Service;
  onPress?: () => void;
  showAction?: boolean; // true = Booking screen (Choose button), false = Home screen (display only)
};

export default function ServiceCard({ service, onPress, showAction = false }: ServiceCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={showAction ? 0.7 : 1}
      disabled={!showAction}
   className="items-center bg-white rounded-2xl p-4 shadow-sm"
    >
      <View className="w-14 h-14 rounded-xl bg-orange-100 items-center justify-center mb-2">
        <Ionicons name={service.icon as any} size={26} color={colors.navy} />
      </View>

      <Text className="text-center text-sm font-medium text-petora-navy" numberOfLines={2}>
        {service.name}
      </Text>

      {showAction && (
        <View className="mt-2 bg-petora-orange rounded-full px-3 py-1">
          <Text className="text-petora-onPrimary text-xs font-semibold">Choose</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}