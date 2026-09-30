import { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Booking } from "../context/BookingsContext";
import colors from "../theme/colors";

type BookingCardProps = {
  booking: Booking;
  isPast: boolean;
  onToggleReminder: () => void;
  onReschedule: () => void;
  onCancel: () => void;
};

function ServiceIcon({ name }: { name: string }) {
  const lower = name.toLowerCase();
  if (lower.includes("groom")) return <MaterialCommunityIcons name="content-cut" size={20} color={colors.orange} />;
  if (lower.includes("vet") || lower.includes("checkup")) return <MaterialCommunityIcons name="stethoscope" size={20} color={colors.orange} />;
  if (lower.includes("board")) return <MaterialCommunityIcons name="home" size={20} color={colors.orange} />;
  if (lower.includes("train")) return <MaterialCommunityIcons name="school" size={20} color={colors.orange} />;
  return <MaterialCommunityIcons name="paw" size={20} color={colors.orange} />;
}

export default function BookingCard({ booking, isPast, onToggleReminder, onReschedule, onCancel }: BookingCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmingCancel, setConfirmingCancel] = useState(false);

  return (
    <View className="bg-white rounded-2xl p-4 mb-3 border border-petora-line">
      <View className="flex-row items-start">
        <View className="w-11 h-11 rounded-full bg-petora-orangeTint items-center justify-center mr-3">
          <ServiceIcon name={booking.service.name} />
        </View>

        {booking.pet.photoUrl ? (
          <Image source={{ uri: booking.pet.photoUrl }} className="w-11 h-11 rounded-xl mr-3" resizeMode="cover" />
        ) : (
          <View className="w-11 h-11 rounded-xl bg-petora-orangeTint items-center justify-center mr-3">
            <Ionicons name="paw" size={18} color={colors.navy} />
          </View>
        )}

        <View className="flex-1">
          <Text className="font-bold text-petora-navy">{booking.service.name}</Text>
          <Text className="text-xs text-petora-inkMuted mt-0.5">{booking.pet.name} ({booking.pet.species})</Text>
          {booking.provider && <Text className="text-xs text-petora-inkMuted mt-0.5">{booking.provider.name}</Text>}
          <Text className="text-xs text-petora-inkMuted mt-0.5">{booking.date} • {booking.time}</Text>
        </View>

        <View className="items-end">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={onToggleReminder} hitSlop={8} className="mr-2">
              <Ionicons
                name={booking.reminder ? "notifications" : "notifications-outline"}
                size={20}
                color={booking.reminder ? colors.orange : colors.inkMuted}
              />
            </TouchableOpacity>
            {!isPast && (
              <TouchableOpacity onPress={() => setMenuOpen((v) => !v)} hitSlop={8}>
                <Ionicons name="ellipsis-vertical" size={18} color={colors.inkMuted} />
              </TouchableOpacity>
            )}
          </View>
          <View className="mt-2 rounded-full px-2.5 py-1" style={{ backgroundColor: isPast ? "#DDEAFB" : colors.successTint }}>
            <Text className="text-[10px] font-semibold" style={{ color: isPast ? colors.blue : colors.successInk }}>
              {isPast ? "Completed" : "Upcoming"}
            </Text>
          </View>
        </View>
      </View>

      {menuOpen && !isPast && (
        <View className="mt-3 pt-3 border-t border-petora-line">
          {confirmingCancel ? (
            <View>
              <Text className="text-red-500 text-sm mb-2">Cancel this booking?</Text>
              <View className="flex-row gap-2">
                <TouchableOpacity onPress={onCancel} className="bg-red-400 rounded-full px-4 py-1.5">
                  <Text className="text-white text-sm font-medium">Yes, Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setConfirmingCancel(false)} className="border border-petora-line rounded-full px-4 py-1.5">
                  <Text className="text-petora-navy text-sm font-medium">Keep It</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View className="flex-row gap-2">
              <TouchableOpacity onPress={onReschedule} className="border border-petora-orange rounded-full px-4 py-1.5">
                <Text className="text-petora-orange text-sm font-medium">Reschedule</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setConfirmingCancel(true)} className="border border-red-400 rounded-full px-4 py-1.5">
                <Text className="text-red-400 text-sm font-medium">Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
}