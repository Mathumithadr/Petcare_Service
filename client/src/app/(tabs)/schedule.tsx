import { useMemo, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import WeekStrip from "../../components/WeekStrip";
import MonthGridCalendar from "../../components/MonthGridCalendar";
import BookingCard from "../../components/BookingCard";
import { useBookings } from "../../context/BookingsContext";
import { toIsoDate } from "../../utils/date";

type Tab = "upcoming" | "history";

export default function ScheduleScreen() {
  const { bookings, cancelBooking, toggleReminder } = useBookings();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [expanded, setExpanded] = useState(false);
  const [tab, setTab] = useState<Tab>("upcoming");

  const todayIso = toIsoDate(new Date());
  const bookingDates = useMemo(() => new Set(bookings.map((b) => b.date)), [bookings]);

  const filtered = useMemo(() => {
    const list = bookings.filter((b) => (tab === "upcoming" ? b.date >= todayIso : b.date < todayIso));
    return list.sort((a, b) => (tab === "upcoming" ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)));
  }, [bookings, tab, todayIso]);

  return (
    <ScrollView className="flex-1 bg-petora-alice" contentContainerStyle={{ paddingBottom: 120 }}>
      <View className="pt-4">
        {expanded ? (
          <MonthGridCalendar
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            bookingDates={bookingDates}
            onCollapse={() => setExpanded(false)}
          />
        ) : (
          <WeekStrip
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            bookingDates={bookingDates}
            onExpand={() => setExpanded(true)}
          />
        )}

        <View className="flex-row mx-4 mt-4 rounded-full bg-white p-1 border border-petora-line">
          <TouchableOpacity
            onPress={() => setTab("upcoming")}
            className={`flex-1 items-center py-2 rounded-full ${tab === "upcoming" ? "bg-petora-orange" : ""}`}
          >
            <Text className={`text-sm font-semibold ${tab === "upcoming" ? "text-white" : "text-petora-navy"}`}>Upcoming</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTab("history")}
            className={`flex-1 items-center py-2 rounded-full ${tab === "history" ? "bg-petora-orange" : ""}`}
          >
            <Text className={`text-sm font-semibold ${tab === "history" ? "text-white" : "text-petora-navy"}`}>History</Text>
          </TouchableOpacity>
        </View>

        <View className="px-4 mt-4">
          <Text className="text-lg font-bold text-petora-navy mb-3">
            {tab === "upcoming" ? "Upcoming Bookings" : "Past Bookings"}
          </Text>

          {filtered.length === 0 ? (
            <Text className="text-petora-inkMuted text-sm">
              {tab === "upcoming" ? "No upcoming bookings." : "No past bookings yet."}
            </Text>
          ) : (
            filtered.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                isPast={tab === "history"}
                onToggleReminder={() => toggleReminder(booking.id)}
                onReschedule={() => router.push({ pathname: "/(tabs)/booking", params: { editBookingId: booking.id } })}
                onCancel={() => cancelBooking(booking.id)}
              />
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
}