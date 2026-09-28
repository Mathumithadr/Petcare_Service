export type ScheduleItem = {
  id: string;
  title: string;
  petName: string;
  time: string;
  type: "vaccination" | "appointment" | "reminder";
};

export const mockSchedule: ScheduleItem[] = [
  {
    id: "1",
    title: "Grooming Appointment",
    petName: "Bruno",
    time: "Today, 4:00 PM",
    type: "appointment",
  },
  {
    id: "2",
    title: "Rabies Vaccination",
    petName: "Bruno",
    time: "Due in 3 months",
    type: "vaccination",
  },
  {
    id: "3",
    title: "Vet Checkup",
    petName: "Momo",
    time: "Tomorrow, 10:00 AM",
    type: "appointment",
  },
];