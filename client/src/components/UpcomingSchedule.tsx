import { View, Text } from "react-native";
import ScheduleItemCard from "./ScheduleItemCard";
import { ScheduleItem } from "../data/mockSchedule";

type UpcomingScheduleProps = {
  items: ScheduleItem[];
  title?: string;
};

export default function UpcomingSchedule({ items, title = "Upcoming Schedule" }: UpcomingScheduleProps) {
  return (
    <View className="mt-4 px-4">
      {title ? (
        <Text className="text-lg font-bold text-petora-navy mb-3">{title}</Text>
      ) : null}

      {items.length === 0 ? (
        <Text className="text-petora-inkMuted text-sm">No upcoming activities.</Text>
      ) : (
        items.map((item) => <ScheduleItemCard key={item.id} item={item} />)
      )}
    </View>
  );
}