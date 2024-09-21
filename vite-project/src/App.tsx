import { useState, useEffect } from "react";
import { PokemonCardList } from "./Components/PokemonCardList";
import { Header } from "./Components/Header";
import { Box, CircularProgress, Typography } from "@mui/material";
import "./App.css";

interface Pokemon {
  id: number;
  name: string;
  types: string[];
  height: number;
  weight: number;
}

function App() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const query = `
  query samplePokeAPIquery {
    gen3_species: pokemon_v2_pokemonspecies(
      where: { pokemon_v2_generation: { name: { _eq: "generation-i" } } },
      order_by: { id: asc }
    ) {
      name
      id
      pokemon_v2_pokemons {
        height
        weight
      }
    }
    pokemon_v2_pokemontype(limit: 218) {
      type_id
      pokemon_id
      id
      pokemon_v2_type {
        name
      }
    }
  }
  `;

  useEffect(() => {
    fetch("https://beta.pokeapi.co/graphql/v1beta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    })
      .then((response) => response.json())
      .then((data) => {
        const pokemonData = data.data.gen3_species.map((species: any) => ({
          id: species.id,
          name: species.name,
          height: species.pokemon_v2_pokemons[0].height/10,
          weight: species.pokemon_v2_pokemons[0].weight/10,
          types: data.data.pokemon_v2_pokemontype
            .filter((type: any) => type.pokemon_id === species.id)
            .map((type: any) => type.pokemon_v2_type.name),
        }));
        setPokemon(pokemonData);
        setFilteredPokemon(pokemonData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  function handleSearch(searchTerm: string) {
    const lowercaseSearchTerm = searchTerm.toLowerCase().trim();
    const filtered = pokemon.filter((p) => {
      const nameMatch = p.name.toLowerCase().includes(lowercaseSearchTerm);
      const idMatch = p.id.toString() === lowercaseSearchTerm;
      return nameMatch || idMatch;
    });
    setFilteredPokemon(filtered);
  }

  if (loading) return (
    <>
    <Header onSearch={handleSearch} search={true}  />
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <CircularProgress />
    </Box></>
  );
  if (error) return <Typography variant="h6">Error: {error}</Typography>;

  return (
    <Box sx={{ width: "100%" }}>
      <Header onSearch={handleSearch} search={true} />
      <Box sx={{ marginTop: 2 }}>
        <PokemonCardList pokemon={filteredPokemon} />
      </Box>
    </Box>
  );
}

export default App;
