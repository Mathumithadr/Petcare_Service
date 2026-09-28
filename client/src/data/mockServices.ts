export type Service = {
  id: string;
  name: string;
  icon: string; // Ionicons name
  applicablePetTypes: ("Dog" | "Cat" | "Bird" | "Fish")[];
};

export const mockServices: Service[] = [
  {
    id: "1",
    name: "Grooming",
    icon: "cut",
    applicablePetTypes: ["Dog", "Cat"],
  },
  {
    id: "2",
    name: "Vet Appointment",
    icon: "medkit",
    applicablePetTypes: ["Dog", "Cat", "Bird", "Fish"],
  },
  {
    id: "3",
    name: "Pet Boarding",
    icon: "home",
    applicablePetTypes: ["Dog", "Cat", "Bird"],
  },
  {
    id: "4",
    name: "Pet Training",
    icon: "school",
    applicablePetTypes: ["Dog", "Cat"],
  },
];