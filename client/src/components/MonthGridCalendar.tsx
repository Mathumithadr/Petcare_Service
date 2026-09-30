import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/colors";
import { toIsoDate, WEEKDAY_LABELS, MONTH_LABELS } from "../utils/date";

type MonthGridCalendarProps = {
  selectedDate: Date;
  onSelectDate: (d: Date) => void;
  bookingDates: Set<string>;
  onCollapse: () => void;
};

function buildMonthMatrix(year: number, month: number) {
  const startDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

export default function MonthGridCalendar({ selectedDate, onSelectDate, bookingDates, onCollapse }: MonthGridCalendarProps) {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const weeks = buildMonthMatrix(year, month);
  const today = new Date();

  return (
    <View className="mx-4 rounded-2xl bg-white p-4">
      <View className="flex-row items-center justify-between mb-4">
        <TouchableOpacity onPress={() => onSelectDate(new Date(year, month - 1, selectedDate.getDate()))} hitSlop={8}>
          <Ionicons name="chevron-back" size={20} color={colors.navy} />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-petora-navy">{MONTH_LABELS[month]} {year}</Text>
        <TouchableOpacity onPress={() => onSelectDate(new Date(year, month + 1, selectedDate.getDate()))} hitSlop={8}>
          <Ionicons name="chevron-forward" size={20} color={colors.navy} />
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-between mb-2">
        {WEEKDAY_LABELS.map((label) => (
          <Text key={label} className="text-xs text-petora-inkMuted" style={{ width: 32, textAlign: "center" }}>
            {label}
          </Text>
        ))}
      </View>

      {weeks.map((week, i) => (
        <View key={i} className="flex-row justify-between mb-2">
          {week.map((day, j) => {
            if (!day) return <View key={j} style={{ width: 32, height: 40 }} />;
            const iso = toIsoDate(day);
            const isSelected = iso === toIsoDate(selectedDate);
            const isToday = iso === toIsoDate(today);
            const hasBooking = bookingDates.has(iso);

            return (
              <TouchableOpacity key={j} onPress={() => onSelectDate(day)} className="items-center" style={{ width: 32 }}>
                <View
                  className={`items-center justify-center rounded-full ${isSelected ? "bg-petora-orange" : ""}`}
                  style={{ width: 28, height: 28 }}
                >
                  <Text
                    className={`text-sm ${
                      isSelected ? "text-white font-bold" : isToday ? "text-petora-orange font-semibold" : "text-petora-navy"
                    }`}
                  >
                    {day.getDate()}
                  </Text>
                </View>
                <View className="mt-0.5 h-1 w-1 rounded-full" style={{ backgroundColor: hasBooking ? colors.orange : "transparent" }} />
              </TouchableOpacity>
            );
          })}
        </View>
      ))}

      <TouchableOpacity onPress={onCollapse} className="flex-row items-center justify-center mt-2">
        <Ionicons name="chevron-up" size={16} color={colors.inkMuted} />
        <Text className="ml-1 text-xs text-petora-inkMuted">Collapse to week view</Text>
      </TouchableOpacity>
    </View>
  );
}