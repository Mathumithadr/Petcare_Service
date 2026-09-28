import { useState } from "react";
import { View, Text, ScrollView, Modal, TouchableOpacity } from "react-native";
import ServicesGrid from "../../components/ServicesGrid";
import SelectPetStep from "../../components/SelectPetStep";
import BookingForm, { MatchPreference } from "../../components/BookingForm";
import ProviderMap from "../../components/ProviderMap";
import ProviderDetailsPopup from "../../components/ProviderDetailsPopup";
import { mockPets, Pet } from "../../data/mockPets";
import { mockServices, Service } from "../../data/mockServices";
import { mockProviders, Provider } from "../../data/mockProviders";

type Step = "select-service" | "select-pet" | "form";

function matchProvider(
  providers: Provider[],
  service: Service,
  pet: Pet,
  preference: MatchPreference
): Provider | null {
  const eligible = providers.filter(
    (p) => p.services.includes(service.name) && p.acceptedPetTypes.includes(pet.species)
  );
  if (eligible.length === 0) return null;
  if (preference === "nearest") {
    return [...eligible].sort((a, b) => a.distanceKm - b.distanceKm)[0];
  }
  return [...eligible].sort((a, b) => a.price - b.price)[0];
}

export default function BookingScreen() {
  const [step, setStep] = useState<Step>("select-service");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const [providerServiceOptions, setProviderServiceOptions] = useState<Service[] | null>(null);

  const [popupProvider, setPopupProvider] = useState<Provider | null>(null);
  const [cancelConfirmId, setCancelConfirmId] = useState<string | null>(null);
  const [editingBookingId, setEditingBookingId] = useState<string | null>(null);

  const [confirmedBookings, setConfirmedBookings] = useState
    <{
      id: string;
      service: Service;
      pet: Pet;
      provider: Provider | null;
      date: string;
      time: string;
      address: string;
      notes: string;
    }[]
    >([]);

  const selectedPet = mockPets.find((p) => p.id === selectedPetId) ?? null;

  const resetFlow = () => {
    setStep("select-service");
    setSelectedService(null);
    setSelectedProvider(null);
    setSelectedPetId(null);
    setProviderServiceOptions(null);
    setEditingBookingId(null);
  };

  // Flow A: service picked from grid
  const handleSelectService = (service: Service) => {
    setSelectedService(service);
    if (!providerServiceOptions) {
      setSelectedProvider(null);
    }
    setStep("select-pet");
  };

  // Flow B: pin tapped
  const handleSelectPin = (provider: Provider) => {
    setPopupProvider(provider);
  };

  // Flow B: Book Now inside popup
  const handleBookNowFromPopup = () => {
    if (!popupProvider) return;
    const providerServices = mockServices.filter((s) => popupProvider.services.includes(s.name));
    setSelectedProvider(popupProvider);
    setProviderServiceOptions(providerServices);
    setPopupProvider(null);
    setStep("select-service"); // filtered grid, service still needs picking
  };

  const handlePetNext = () => {
    setStep("form");
  };

  const handleConfirmBooking = (details: {
    date: string;
    time: string;
    address: string;
    notes: string;
    preference?: MatchPreference;
  }) => {
    if (!selectedService || !selectedPet) return;

    let finalProvider = selectedProvider;

    if (!finalProvider && details.preference) {
      finalProvider = matchProvider(mockProviders, selectedService, selectedPet, details.preference);
      if (!finalProvider) {
        alert(`Sorry, no providers currently offer ${selectedService.name} for ${selectedPet.species}s.`);
        return;
      }
    }

    if (editingBookingId) {
      setConfirmedBookings((prev) =>
        prev.map((b) =>
          b.id === editingBookingId
            ? { ...b, date: details.date, time: details.time, address: details.address, notes: details.notes, provider: finalProvider ?? b.provider }
            : b
        )
      );
    } else {
      setConfirmedBookings((prev) => [
        ...prev,
        {
          id: String(Date.now()),
          service: selectedService,
          pet: selectedPet,
          provider: finalProvider,
          date: details.date,
          time: details.time,
          address: details.address,
          notes: details.notes,
        },
      ]);
    }

    resetFlow();
  };

  const handleCancelBooking = (id: string) => {
    setConfirmedBookings((prev) => prev.filter((b) => b.id !== id));
    setCancelConfirmId(null);
  };

  const handleRescheduleBooking = (id: string) => {
    const booking = confirmedBookings.find((b) => b.id === id);
    if (!booking) return;
    setSelectedService(booking.service);
    setSelectedProvider(booking.provider);
    setSelectedPetId(booking.pet.id);
    setEditingBookingId(id);
    setStep("form");

  };

  // Pets eligible for the currently selected service (and provider, if set)
  const eligiblePets = selectedService
    ? mockPets.filter((p) => selectedService.applicablePetTypes.includes(p.species))
    : mockPets;

  const serviceGridOptions = providerServiceOptions ?? mockServices;

  return (
    <ScrollView className="flex-1 bg-petora-alice">
      <View className="pt-8">
        {step === "select-service" && (
          <View>
            <Text className="text-2xl font-bold text-petora-navy text-center mb-4">
              {providerServiceOptions ? `Choose a service from ${selectedProvider?.name}` : "Choose a Service"}
            </Text>
            <ServicesGrid
              services={serviceGridOptions}
              title=""
              showAction={true}
              onSelectService={handleSelectService}
            />

            {!providerServiceOptions && (
              <View className="mt-6">
                <Text className="text-lg font-bold text-petora-navy mb-3 px-4">
                  Nearby Providers
                </Text>
                <ProviderMap providers={mockProviders} onSelectProvider={handleSelectPin} />
              </View>
            )}
          </View>
        )}

        {step === "select-pet" && (
          <>
            {eligiblePets.length === 0 ? (
              <View className="bg-white rounded-t-3xl p-6 pt-8 items-center">
                <Text className="text-lg font-bold text-petora-navy mb-2">
                  No eligible pets
                </Text>
                <Text className="text-petora-inkMuted text-center mb-6">
                  None of your pets are eligible for {selectedService?.name}.
                </Text>
                <TouchableOpacity
                  onPress={() => setStep("select-service")}
                  className="border border-petora-orange rounded-full px-6 py-3"
                >
                  <Text className="text-petora-orange font-semibold">Choose a Different Service</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <SelectPetStep
                pets={eligiblePets}
                selectedPetId={selectedPetId}
                onSelect={setSelectedPetId}
                onNext={handlePetNext}
                onCancel={() => setStep("select-service")}
              />
            )}
          </>
        )}

        {step === "form" && (
          <BookingForm
            service={selectedService}
            pet={selectedPet}
            provider={selectedProvider}
            initialValues={
              editingBookingId
                ? confirmedBookings.find((b) => b.id === editingBookingId)
                : undefined
            }
            onConfirm={handleConfirmBooking}
            onBack={() => setStep("select-pet")}
          />
        )}

        {/* My Bookings — unchanged from before */}
        <View className="mt-6 px-4 pb-8">
          <Text className="text-lg font-bold text-petora-navy mb-3">My Bookings</Text>
          {confirmedBookings.length === 0 ? (
            <Text className="text-petora-inkMuted text-sm">No bookings yet.</Text>
          ) : (
            confirmedBookings.map((b) => (
              <View key={b.id} className="bg-white rounded-2xl p-4 mb-2 shadow-sm">
                <Text className="font-semibold text-petora-navy">
                  {b.service.name} — {b.pet.name}
                </Text>
                <Text className="text-petora-inkMuted text-sm mt-1">
                  {b.provider?.name ?? "Unassigned"} · {b.date} at {b.time}
                </Text>

                {cancelConfirmId === b.id ? (
                  <View className="mt-3">
                    <Text className="text-red-500 text-sm mb-2">Cancel this booking?</Text>
                    <View className="flex-row gap-2">
                      <TouchableOpacity
                        onPress={() => handleCancelBooking(b.id)}
                        className="bg-red-400 rounded-full px-4 py-1.5"
                      >
                        <Text className="text-petora-onPrimary text-sm font-medium">Yes, Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => setCancelConfirmId(null)}
                        className="border border-petora-line rounded-full px-4 py-1.5"
                      >
                        <Text className="text-petora-navy text-sm font-medium">Keep It</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View className="flex-row mt-3 gap-2">
                    <TouchableOpacity
                      onPress={() => handleRescheduleBooking(b.id)}
                      className="border border-petora-orange rounded-full px-4 py-1.5"
                    >
                      <Text className="text-petora-orange text-sm font-medium">Reschedule</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setCancelConfirmId(b.id)}
                      className="border border-red-400 rounded-full px-4 py-1.5"
                    >
                      <Text className="text-red-400 text-sm font-medium">Cancel</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))
          )}
        </View>
      </View>

      <Modal visible={!!popupProvider} animationType="slide" transparent onRequestClose={() => setPopupProvider(null)}>
        <View className="flex-1 justify-end bg-black/40">
          {popupProvider && (
            <ProviderDetailsPopup
              provider={popupProvider}
              onBookNow={handleBookNowFromPopup}
              onClose={() => setPopupProvider(null)}
            />
          )}
        </View>
      </Modal>
    </ScrollView>
  );
}