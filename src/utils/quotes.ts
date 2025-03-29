// Collection of motivational quotes for habit building
const motivationalQuotes = [
  "Success is the sum of small efforts, repeated day in and day out.",
  "The only bad workout is the one that didn't happen.",
  "Small daily improvements are the key to staggering long-term results.",
  "Motivation is what gets you started. Habit is what keeps you going.",
  "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
  "Good habits formed at youth make all the difference.",
  "Habits are the compound interest of self-improvement.",
  "You'll never change your life until you change something you do daily.",
  "Discipline is choosing between what you want now and what you want most.",
  "The secret of getting ahead is getting started.",
  "Don't stop when you're tired. Stop when you're done.",
  "The difference between who you are and who you want to be is what you do.",
  "Every action you take is a vote for the type of person you wish to become.",
  "Your habits shape your identity, and your identity shapes your habits.",
  "The chains of habit are too light to be felt until they are too heavy to be broken.",
  "Success doesn't come from what you do occasionally, it comes from what you do consistently.",
  "Your future is created by what you do today, not tomorrow.",
  "The best way to predict your future is to create it through small, consistent habits.",
  "Consistency is the key to achieving and maintaining momentum.",
  "It's not what we do once in a while that shapes our lives, but what we do consistently."
];

/**
 * Returns a random motivational quote from the collection
 */
export const getMotivationalQuote = (): string => {
  const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
  return motivationalQuotes[randomIndex];
};

/**
 * Returns a specific motivational quote by index
 */
export const getQuoteByIndex = (index: number): string => {
  if (index >= 0 && index < motivationalQuotes.length) {
    return motivationalQuotes[index];
  }
  return getMotivationalQuote();
};
