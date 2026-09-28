import { View, ScrollView } from "react-native";
import HomeHeader from "../../components/HomeHeader";
import SearchBar from "../../components/SearchBar";
import HeroSlider from "../../components/HeroSlider";
import PetCardSlider from "../../components/PetCardSlider";
import UpcomingSchedule from "../../components/UpcomingSchedule";
import ServicesGrid from "../../components/ServicesGrid";
import { mockPets } from "../../data/mockPets";
import { mockSchedule } from "../../data/mockSchedule";
import { mockServices } from "../../data/mockServices";

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-petora-alice" contentContainerStyle={{ paddingBottom: 120 }}>
      <SearchBar />
      <HeroSlider />

      {/* Quick Booking banner goes here — added after Booking screen is finalized */}

      <ServicesGrid services={mockServices} title="Quick Actions" showAction />
      <UpcomingSchedule items={mockSchedule} />
      <PetCardSlider pets={mockPets} />
    </ScrollView>
  );
}