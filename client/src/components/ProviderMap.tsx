import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "../data/mockProviders";
import colors from "../theme/colors";

type ProviderMapProps = {
  providers: Provider[];
  onSelectProvider: (provider: Provider) => void;
  expanded?: boolean;
};

// Simple pseudo-positions for pin placement on the placeholder map (percentage-based)
const PIN_POSITIONS = [
  { top: "20%", left: "30%" },
  { top: "45%", left: "65%" },
  { top: "65%", left: "25%" },
  { top: "35%", left: "80%" },
];

export default function ProviderMap({ providers, onSelectProvider, expanded = false }: ProviderMapProps) {
  return (
    <View
      className="mx-4 rounded-2xl overflow-hidden bg-petora-orangeTint"
      style={{ height: expanded ? 400 : 160 }}
    >
      {/* Placeholder map background */}
      <View className="flex-1 bg-petora-orangeTint relative">
        <View className="absolute inset-0 items-center justify-center opacity-20">
          <Ionicons name="map" size={80} color={colors.orange} />
        </View>

        {providers.slice(0, PIN_POSITIONS.length).map((provider, index) => (
          <TouchableOpacity
            key={provider.id}
            onPress={() => onSelectProvider(provider)}
            className="absolute items-center"
            style={{
              top: PIN_POSITIONS[index].top as any,
              left: PIN_POSITIONS[index].left as any,
            }}
          >
            <View className="w-9 h-9 rounded-full bg-petora-orange items-center justify-center border-2 border-white shadow-sm">
              <Ionicons name="paw" size={16} color="white" />
            </View>
          </TouchableOpacity>
        ))}

        {!expanded && (
          <View className="absolute bottom-2 right-2 bg-white/90 rounded-full px-3 py-1.5 flex-row items-center">
            <Ionicons name="expand" size={14} color={colors.orange} />
            <Text className="ml-1 text-orange-600 text-xs font-semibold">Tap to expand</Text>
          </View>
        )}
      </View>
    </View>
  );
}