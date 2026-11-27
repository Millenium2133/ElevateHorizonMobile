const eventImages = {
  archery: require('../assets/eventImages/archery.jpeg'),
  bbq: require('../assets/eventImages/bbq.jpeg'),
  boardgame: require('../assets/eventImages/boardgame.jpeg'),
  bookclub: require('../assets/eventImages/bookclub.jpeg'),
  cleanup: require('../assets/eventImages/cleanup.jpeg'),
  communityservice: require('../assets/eventImages/communityservice.jpeg'),
  cooking: require('../assets/eventImages/cooking.jpeg'),
  crafting: require('../assets/eventImages/crafting.jpeg'),
  cycling: require('../assets/eventImages/cycling.jpeg'),
  digitalart: require('../assets/eventImages/digitalart.jpeg'),
  digitalmarketing: require('../assets/eventImages/digitalmarketing.jpeg'),
  gardening: require('../assets/eventImages/gardening.jpeg'),
  hiking: require('../assets/eventImages/hiking.jpeg'),
  history: require('../assets/eventImages/history.jpeg'),
  jazz: require('../assets/eventImages/jazz.jpeg'),
  kayak: require('../assets/eventImages/kayak.jpeg'),
  meditation: require('../assets/eventImages/meditation.jpeg'),
  movienight: require('../assets/eventImages/movienight.jpeg'),
  music: require('../assets/eventImages/music.jpeg'),
  nutrition: require('../assets/eventImages/nutrition.jpeg'),
  photography: require('../assets/eventImages/photography.jpeg'),
  poetry: require('../assets/eventImages/poetry.jpeg'),
  rockclimbing: require('../assets/eventImages/rockclimbing.jpeg'),
  salsadance: require('../assets/eventImages/salsadance.jpeg'),
  sciencefair: require('../assets/eventImages/sciencefair.jpeg'),
  wineandcheesetasting: require('../assets/eventImages/wineandcheesetasting.jpeg'),
  workout: require('../assets/eventImages/workout.jpeg'),
  yoga: require('../assets/eventImages/yoga.jpeg'),
};

const aliases = {
  crafting: ['pottery'],
  salsadance: ['salsadancing'],
  wineandcheesetasting: ['winecheesetasting'],
};

const categoryFallbacks = {
  arts: 'digitalart',
  community: 'communityservice',
  dance: 'salsadance',
  educational: 'sciencefair',
  entertainment: 'movienight',
  fitness: 'workout',
  games: 'boardgame',
  music: 'music',
  outdoor: 'hiking',
  social: 'wineandcheesetasting',
  wellness: 'yoga',
};

const imageKeys = Object.keys(eventImages).sort((left, right) => right.length - left.length);

function normalize(value) {
  return String(value ?? '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function getEventImage(event) {
  // Prefer a title match; category and generic fallbacks keep every event card illustrated.
  const title = normalize(event?.title);
  const imageKey = imageKeys.find((key) =>
    [key, ...(aliases[key] ?? [])].some((keyword) => title.includes(keyword))
  );

  const fallbackKey = categoryFallbacks[normalize(event?.category)] ?? 'communityservice';
  return eventImages[imageKey ?? fallbackKey];
}
