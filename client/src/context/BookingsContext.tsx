import { createContext, useContext, useState, ReactNode } from "react";
import { Service } from "../data/mockServices";
import { Pet } from "../data/mockPets";
import { Provider } from "../data/mockProviders";

export type Booking = {
  id: string;
  service: Service;
  pet: Pet;
  provider: Provider | null;
  date: string;
  time: string;
  address: string;
  notes: string;
  reminder: boolean;
};

type NewBookingInput = Omit<Booking, "id" | "reminder">;

type BookingsContextValue = {
  bookings: Booking[];
  addBooking: (booking: NewBookingInput) => void;
  updateBooking: (id: string, changes: Partial<Omit<Booking, "id">>) => void;
  cancelBooking: (id: string) => void;
  toggleReminder: (id: string) => void;
  getBooking: (id: string) => Booking | undefined;
};

const BookingsContext = createContext<BookingsContextValue | undefined>(undefined);

export function BookingsProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const addBooking = (booking: NewBookingInput) => {
    setBookings((prev) => [...prev, { ...booking, id: String(Date.now()), reminder: false }]);
  };

  const updateBooking = (id: string, changes: Partial<Omit<Booking, "id">>) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, ...changes } : b)));
  };

  const cancelBooking = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  const toggleReminder = (id: string) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, reminder: !b.reminder } : b)));
  };

  const getBooking = (id: string) => bookings.find((b) => b.id === id);

  return (
    <BookingsContext.Provider
      value={{ bookings, addBooking, updateBooking, cancelBooking, toggleReminder, getBooking }}
    >
      {children}
    </BookingsContext.Provider>
  );
}

export function useBookings() {
  const ctx = useContext(BookingsContext);
  if (!ctx) throw new Error("useBookings must be used within a BookingsProvider");
  return ctx;
}