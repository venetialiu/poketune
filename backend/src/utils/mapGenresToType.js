export const genreToType = {
  pop: "fairy",
  rock: "rock",
  metal: "steel",
  indie: "grass",
  electronic: "electric",
  ambient: "psychic",
  hiphop: "dark",
  techno: "electric",
  classical: "psychic",
  jazz: "water",
  rnb: "normal",
  house: "fire"
}

export function findPokemonTypeFromGenres(genres) {
  let counts = {};

  genres.forEach(g => {
    const lower = g.toLowerCase();

    Object.keys(genreToType).forEach(key => {
    // look for keywords
      if(lower.includes(key)){
        // convert keywords to pokemon types
        const type = genreToType[key];
        // increment count of each genre
        counts[type] = (counts[type] || 0) + 1;
      }
    });
  });

  // pick the most frequent genre
  return Object.entries(counts).sort((a,b)=>b[1]-a[1])[0]?.[0] || "normal";
}
