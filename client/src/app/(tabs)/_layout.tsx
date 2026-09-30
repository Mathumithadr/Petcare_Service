import { useState } from "react";
import { Tabs, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, TouchableOpacity, Modal } from "react-native";

import colors from "../../theme/colors";
import HomeHeader from "../../components/HomeHeader";
import PetActionPopup from "../../components/PetActionPopup";

function AddPetButton({ onPress }: { onPress?: () => void }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                top: -20,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <View
                style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: colors.orange,
                    justifyContent: "center",
                    alignItems: "center",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.25,
                    shadowRadius: 6,
                    elevation: 6,
                }}
            >
                <Ionicons name="paw" size={28} color={colors.navy} />
            </View>
        </TouchableOpacity>
    );
}

export default function TabsLayout() {
    const [showPetAction, setShowPetAction] = useState(false);

    return (
        <>
            <Tabs
                screenOptions={{
                    headerShown: true,
                    header: () => <HomeHeader />,
                    tabBarActiveTintColor: colors.navy,
                    tabBarInactiveTintColor: colors.inkMuted,
                    tabBarStyle: {
                        height: 64,
                        paddingBottom: 8,
                        paddingTop: 8,
                        backgroundColor: colors.white,
                    },
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: "Home",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="home" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="booking"
                    options={{
                        title: "Booking",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="document-text" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="add-pet"
                    options={{
                        title: "",
                        tabBarIcon: () => null,
                        tabBarButton: () => (
                            <AddPetButton onPress={() => setShowPetAction(true)} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="schedule"
                    options={{
                        title: "Schedule",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="calendar" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="me"
                    options={{
                        title: "Me",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="person" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="my-pets"
                    options={{
                        href: null,
                    }}
                />
                  <Tabs.Screen name="pet-added" options={{ href: null }} /> 
            </Tabs>

          

            <Modal
                visible={showPetAction}
                animationType="slide"
                transparent
                onRequestClose={() => setShowPetAction(false)}
            >
                <View className="flex-1 justify-end bg-black/40">
                    <PetActionPopup
                        onClose={() => setShowPetAction(false)}
                        onViewPets={() => {
                            setShowPetAction(false);
                            router.push("/my-pets");
                        }}
                        onAddPet={() => {
                            setShowPetAction(false);
                            router.push("/add-pet");
                        }}
                    />
                </View>
            </Modal>
        </>
    );
}