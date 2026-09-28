export type Pet = {
  id: string;
  name: string;
  photoUrl: string | null;
  species: "Dog" | "Cat" | "Bird" | "Fish";
  breed: string;
  age: string;
  gender: "Male" | "Female";
  weight?: string;
  aggression?: "Low" | "Medium" | "High";
  vaccinated?: boolean;
};

export const mockPets: Pet[] = [
  {
    id: "1",
    name: "Momo",
    photoUrl: null,
    species: "Cat",
    breed: "Persian",
    age: "1 year",
    gender: "Female",
    weight: "4",
    aggression: "Low",
    vaccinated: true,
  },
  {
    id: "2",
    name: "Bruno",
    photoUrl: null,
    species: "Dog",
    breed: "Doberman",
    age: "2 years",
    gender: "Male",
    weight: "28",
    aggression: "Medium",
    vaccinated: true,
  },
  {
    id: "3",
    name: "Nemo",
    photoUrl: null,
    species: "Bird",
    breed: "Canary",
    age: "6 months",
    gender: "Male",
    weight: "0.3",
    aggression: "Low",
    vaccinated: false,
  },
];