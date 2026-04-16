export const nume = "vinil1.ro";
export const formatari = ['toate', 'vinil', 'cd', 'caseta', 'dvd', 'bluray'];
export const an_curent = new Date().getFullYear();
export const formatMap = {
  'toate': null,
  'vinil': 'Vinyl',
  'cd': 'CD',
  'caseta': 'Cassette',
  'dvd': 'DVD',
  'bluray': 'Blu-ray',
};
export const genuri_muzicale = {
  // "toate":{
  //   id: "Toate",
  //   label: "Toate",
  //   styles: []
  // },
  "rock": {
    id: "Rock",
    label: "Rock",
    styles: ["Classic Rock", "Hard Rock", "Punk", "Alternative Rock", "Indie Rock", "Progressive Rock", "Psychedelic Rock", "Grunge", "Metal", "Heavy Metal", "Soft Rock", "Glam"]
  },
  "jazz-blues": {
    id: "Jazz",
    label: "Jazz & Blues",
    styles: ["Blues", "Jazz", "Bebop", "Soul-Jazz", "Jazz-Funk", "Free Jazz", "Smooth Jazz", "Contemporary Jazz", "Rhythm & Blues", "Chicago Blues", "Delta Blues"]
  },
  "soul-funk": {
    id: "Funk / Soul",
    label: "Soul & Funk",
    styles: ["Soul", "Funk", "Rhythm & Blues", "Motown", "Disco", "Neo Soul", "Gospel", "R&B"]
  },
  "hip-hop": {
    id: "Hip Hop",
    label: "Hip-Hop",
    styles: ["Hip Hop", "Rap", "Trap", "Boom Bap", "Gangsta", "R&B", "Trip Hop"]
  },
  "muzica-clasica": {
    id: "Classical",
    label: "Clasică",
    styles: ["Romantic", "Baroque", "Modern", "Contemporary", "Opera", "Symphony", "Chamber Music", "Choral", "Renaissance"]
  },
  "muzica-electronica": {
    id: "Electronic",
    label: "Electronică",
    styles: ["House", "Techno", "Trance", "Ambient", "Drum n Bass", "Electro", "Synthpop", "Industrial", "IDM", "Dubstep", "Downtempo", "EBM"]
  },
  "soundtracks": {
    id: "Stage & Screen",
    label: "Soundtracks",
    styles: ["Soundtrack", "Score", "Musical", "Theme", "Film Score"]
  },
  "muzica-romaneasca": {
    id: "Folk, World, & Country",
    label: "Muzică Românească",
    styles: ["Romanian", "Balkan", "Folk", "Lăutărească", "Manele", "Muzică Populară"]
  },
  "pop": {
    id: "Pop",
    label: "Pop",
    styles: ["Pop", "Synth-pop", "Dance-pop", "Europop", "Ballad", "Teen Pop", "Bubblegum"]
  },
  "copii": {
    id: "Children's",
    label: "Copii",
    styles: ["Educational", "Nursery Rhymes", "Story", "Cartoon"]
  }
};

