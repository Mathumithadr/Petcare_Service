import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, TouchableOpacity } from "react-native";

const ORANGE = "#F97316";
const GRAY = "#9CA3AF";

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
                    backgroundColor: ORANGE,
                    justifyContent: "center",
                    alignItems: "center",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.25,
                    shadowRadius: 6,
                    elevation: 6,
                }}
            >
                <Ionicons name="paw" size={28} color="white" />
            </View>
        </TouchableOpacity>
    );
}

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: ORANGE,
                tabBarInactiveTintColor: GRAY,
                tabBarStyle: {
                    height: 64,
                    paddingBottom: 8,
                    paddingTop: 8,
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
                    tabBarButton: (props) => <AddPetButton onPress={props.onPress as any} />,
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
        </Tabs>
    );
}