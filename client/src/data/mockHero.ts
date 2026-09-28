export type HeroSlide =
  | { id: string; type: 'welcome'; greeting: string; headline: string; subtext: string; image: any }
  | { id: string; type: 'offer'; badge: string; title: string; subtitle: string; cta: string; image: any }
  | { id: string; type: 'membership'; tier: string; title: string; perks: string[]; cta: string };

export const heroSlides: HeroSlide[] = [
  {
    id: 'welcome',
    type: 'welcome',
    greeting: 'Good morning, Dr. Priya',
    headline: "Your pet's health is our priority",
    subtext: 'Quick access to bookings, health records, services and more, all in one place.',
    image: require('../../assets/images/hero-dog.png'),
  },
  {
    id: 'offer-grooming',
    type: 'offer',
    badge: 'SPECIAL OFFER',
    title: '10% OFF on First Grooming',
    subtitle: 'Give your pet the best care',
    cta: 'Book Now',
    image: require('../../assets/images/offer-dog.png'),
  },
  {
    id: 'membership',
    type: 'membership',
    tier: 'PETORA PLUS',
    title: 'Save more on every visit',
    perks: ['Priority booking', 'Member-only discounts', 'Free health reminders'],
    cta: 'View Membership',
  },
];