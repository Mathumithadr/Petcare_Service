import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/colors";
import { addDays, startOfWeek, toIsoDate, WEEKDAY_LABELS, MONTH_LABELS } from "../utils/date";

type WeekStripProps = {
  selectedDate: Date;
  onSelectDate: (d: Date) => void;
  bookingDates: Set<string>;
  onExpand: () => void;
};

export default function WeekStrip({ selectedDate, onSelectDate, bookingDates, onExpand }: WeekStripProps) {
  const weekStart = startOfWeek(selectedDate);
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const today = new Date();

  return (
    <View className="mx-4 rounded-2xl bg-white p-4">
      <View className="flex-row items-center justify-between mb-4">
        <TouchableOpacity onPress={() => onSelectDate(addDays(selectedDate, -7))} hitSlop={8}>
          <Ionicons name="chevron-back" size={20} color={colors.navy} />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-petora-navy">
          {MONTH_LABELS[selectedDate.getMonth()]} {selectedDate.getFullYear()}
        </Text>
        <TouchableOpacity onPress={() => onSelectDate(addDays(selectedDate, 7))} hitSlop={8}>
          <Ionicons name="chevron-forward" size={20} color={colors.navy} />
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-between">
        {days.map((day) => {
          const iso = toIsoDate(day);
          const isSelected = iso === toIsoDate(selectedDate);
          const isToday = iso === toIsoDate(today);
          const hasBooking = bookingDates.has(iso);

          return (
            <TouchableOpacity
              key={iso}
              onPress={() => onSelectDate(day)}
              className={`items-center rounded-2xl px-2 py-2 ${isSelected ? "bg-petora-orange" : ""}`}
              style={{ width: 40 }}
            >
              <Text className={`text-xs ${isSelected ? "text-white" : "text-petora-inkMuted"}`}>
                {WEEKDAY_LABELS[day.getDay()]}
              </Text>
              <Text
                className={`text-base font-semibold mt-1 ${
                  isSelected ? "text-white" : isToday ? "text-petora-orange" : "text-petora-navy"
                }`}
              >
                {day.getDate()}
              </Text>
              <View
                className="mt-1 h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: hasBooking ? (isSelected ? "white" : colors.orange) : "transparent" }}
              />
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity onPress={onExpand} className="flex-row items-center justify-center mt-3">
        <Ionicons name="chevron-down" size={16} color={colors.inkMuted} />
        <Text className="ml-1 text-xs text-petora-inkMuted">Tap to view full month</Text>
      </TouchableOpacity>
    </View>
  );
}