import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ScheduleItem } from "../data/mockSchedule";
import colors from "../theme/colors";

const TYPE_ICON: Record<ScheduleItem["type"], keyof typeof Ionicons.glyphMap> = {
  vaccination: "medkit",
  appointment: "calendar",
  reminder: "notifications",
};

type ScheduleItemCardProps = {
  item: ScheduleItem;
};

export default function ScheduleItemCard({ item }: ScheduleItemCardProps) {
  return (
    <View className="flex-row items-center bg-white rounded-2xl p-3 mb-2 shadow-sm">
      <View className="w-11 h-11 rounded-xl bg-orange-100 items-center justify-center">
        <Ionicons name={TYPE_ICON[item.type]} size={20} color={colors.navy} />
      </View>

      <View className="ml-3 flex-1">
        <Text className="font-semibold text-petora-navy" numberOfLines={1}>
          {item.title}
        </Text>
        <Text className="text-sm text-petora-inkMuted mt-0.5" numberOfLines={1}>
          {item.time} · {item.petName}
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={18} color={colors.inkMuted} />
    </View>
  );
}