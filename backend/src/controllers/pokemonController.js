import { findPokemonTypeFromGenres } from "../utils/mapGenresToType.js";

export const getPokemon = async(req, res) => {
  try {
    const genres = req.session.genres;
    const type = findPokemonTypeFromGenres(genres);

    // fetch from poke api
    const typeResponse = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const typeData = await typeResponse.json();

    const pokemons = typeData.pokemon.map(p => p.pokemon.name);
    console.log("Pokemons:", pokemons)

    const selected = pokemons[Math.floor(Math.random() * pokemons.length)];
    console.log("Selected Pokemon:", selected)

    const pokeResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${selected}`);
    const pokeData = await pokeResponse.json();

    console.log("Pokemon Data:", pokeData)

    console.log("name,", selected)
    console.log("sprite,", pokeData.sprites.front_default)
    
    // extract stats
    const stats = {};
    pokeData.stats.forEach(s => {
      stats[s.stat.name] = s.base_stat;
    });

    return res.json({ 
        ok:true, 
        pokemon: {
            type: type, 
            name: selected, 
            sprite: pokeData.sprites.front_default,
            hp: stats["hp"],
            attack: stats["attack"],
            defense: stats["defense"],
            speed: stats["speed"],
    }});

  } catch(err){
    console.log(err);
    return res.status(500).json({ok:false});
  }
}
