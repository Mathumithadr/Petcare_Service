import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "../data/mockProviders";
import colors from "../theme/colors";

type ProviderDetailsPopupProps = {
  provider: Provider;
  onBookNow: () => void;
  onClose: () => void;
};

export default function ProviderDetailsPopup({ provider, onBookNow, onClose }: ProviderDetailsPopupProps) {
  return (
    <View className="bg-white rounded-t-3xl" style={{ maxHeight: "85%" }}>
      <View className="w-10 h-1 bg-petora-orange rounded-full self-center mt-3 mb-2" />

      {/* Close button */}
      <TouchableOpacity onPress={onClose} className="absolute right-4 top-4 z-10">
        <Ionicons name="close" size={24} color={colors.inkMuted} />
      </TouchableOpacity>

      <ScrollView className="px-6 pt-4" showsVerticalScrollIndicator={false}>
        {/* Photo / fallback */}
        <View className="items-center mb-4">
          {provider.photoUrl ? (
            <Image
              source={{ uri: provider.photoUrl }}
              className="w-20 h-20 rounded-full"
              resizeMode="cover"
            />
          ) : (
            <View className="w-20 h-20 rounded-full bg-orange-100 items-center justify-center">
              <Ionicons name="storefront" size={32} color={colors.navy} />
            </View>
          )}
        </View>

        <Text className="text-xl font-bold text-petora-navy text-center mb-1">
          {provider.name}
        </Text>

        {/* Rating */}
        <View className="flex-row items-center justify-center mb-4">
          <Ionicons name="star" size={16} color={colors.orange} />
          <Text className="ml-1 text-petora-navy font-medium">
            {provider.rating} ({provider.reviewCount} reviews)
          </Text>
          <Text className="mx-2 text-slate-300">·</Text>
          <Text className="text-petora-inkMuted">{provider.distanceKm} km away</Text>
        </View>

        {/* Services offered */}
        <Text className="text-sm font-semibold text-petora-navy mb-2">Services Offered</Text>
        <View className="flex-row flex-wrap gap-2 mb-4">
          {provider.services.map((service) => (
            <View key={service} className="bg-petora-orangeTint rounded-full px-3 py-1.5">
              <Text className="text-orange-600 text-sm font-medium">{service}</Text>
            </View>
          ))}
        </View>

        {/* Bio */}
        <Text className="text-sm font-semibold text-petora-navy mb-2">About</Text>
        <Text className="text-petora-navy leading-5 mb-4">{provider.bio}</Text>

        {/* Address */}
        <View className="flex-row items-start mb-4">
          <Ionicons name="location" size={18} color={colors.orange} />
          <Text className="ml-2 text-petora-navy flex-1">{provider.address}</Text>
        </View>

        {/* Price */}
        <View className="flex-row items-center mb-6">
          <Ionicons name="pricetag" size={18} color={colors.orange} />
          <Text className="ml-2 text-petora-navy font-semibold">Starting from ₹{provider.price}</Text>
        </View>
      </ScrollView>

      {/* Pinned Book Now button */}
      <View className="px-6 pb-6 pt-2 border-t border-gray-100">
        <TouchableOpacity
          onPress={onBookNow}
          className="bg-petora-orange rounded-full py-4 items-center"
        >
          <Text className="text-petora-onPrimary font-bold text-base">Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}