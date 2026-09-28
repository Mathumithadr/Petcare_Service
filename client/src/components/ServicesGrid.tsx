import { View, Text } from "react-native";
import ServiceCard from "./ServiceCard";
import { Service } from "../data/mockServices";

type ServicesGridProps = {
  services: Service[];
  title?: string;
  showAction?: boolean;
  onSelectService?: (service: Service) => void;
};

export default function ServicesGrid({
  services,
  title = "Services",
  showAction = false,
  onSelectService,
}: ServicesGridProps) {
  return (
    <View className="mt-4 px-4">
      {title ? (
        <Text className="text-lg font-bold text-petora-navy mb-3">{title}</Text>
      ) : null}

      <View className="flex-row flex-wrap justify-between">
        {services.map((service) => (
          <View key={service.id} style={{ width: "48%" }} className="mb-3">
            <ServiceCard
              service={service}
              showAction={showAction}
              onPress={() => onSelectService?.(service)}
            />
          </View>
        ))}
      </View>
    </View>
  );
}