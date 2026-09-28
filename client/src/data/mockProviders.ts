export type Provider = {
  id: string;
  name: string;
  photoUrl: string | null;
  services: string[];
  acceptedPetTypes: ("Dog" | "Cat" | "Bird" | "Fish")[];
  rating: number;
  reviewCount: number;
  distanceKm: number;
  price: number;
  address: string;
  bio: string;
  latitude: number;
  longitude: number;
};

export const mockProviders: Provider[] = [
  {
    id: "p1",
    name: "Happy Paws Grooming",
    photoUrl: null,
    services: ["Grooming", "Pet Boarding"],
    acceptedPetTypes: ["Dog", "Cat"],
    rating: 4.7,
    reviewCount: 128,
    distanceKm: 1.2,
    price: 499,
    address: "12 Race Course Rd, Coimbatore",
    bio: "Family-run grooming studio with 8+ years of experience handling dogs, cats, and small pets. Gentle, patient staff and premium grooming products.",
    latitude: 11.0018,
    longitude: 76.9629,
  },
  {
    id: "p2",
    name: "Dr. Anitha's Pet Clinic",
    photoUrl: null,
    services: ["Vet Appointment"],
    acceptedPetTypes: ["Dog", "Cat", "Bird", "Fish"],
    rating: 4.9,
    reviewCount: 214,
    distanceKm: 2.5,
    price: 350,
    address: "45 Avinashi Rd, Coimbatore",
    bio: "Full-service veterinary clinic offering checkups, vaccinations, and emergency care. On-call vets available for home visits.",
    latitude: 11.0168,
    longitude: 76.9558,
  },
  {
    id: "p3",
    name: "PawStay Boarding House",
    photoUrl: null,
    services: ["Pet Boarding", "Pet Training"],
    acceptedPetTypes: ["Dog", "Cat"],
    rating: 4.5,
    reviewCount: 76,
    distanceKm: 3.8,
    price: 700,
    address: "9 Trichy Rd, Coimbatore",
    bio: "Spacious, climate-controlled boarding facility with daily walks, playtime, and webcam access so you can check in anytime.",
    latitude: 10.9895,
    longitude: 76.9721,
  },
  {
    id: "p4",
    name: "Bark & Learn Training Co.",
    photoUrl: null,
    services: ["Pet Training"],
    acceptedPetTypes: ["Dog"],
    rating: 4.6,
    reviewCount: 54,
    distanceKm: 4.1,
    price: 600,
    address: "22 DB Road, RS Puram, Coimbatore",
    bio: "Positive-reinforcement based obedience and behavior training for dogs of all ages, in-home or at our facility.",
    latitude: 11.0089,
    longitude: 76.9424,
  },
];