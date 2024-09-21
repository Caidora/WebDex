import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
} from "@mui/material";
import { Header } from "./components/Header";
import { PokemonType, capitalizeFirstLetter } from "./components/PokemonType";
import "./PokemonView.css";

interface Pokemon {
  id: number;
  name: string;
  evolution_chain_id: number;
  evolves_from_species_id: number;
  capture_rate: number;
  base_happiness: number;
  height: number;
  weight: number;
  egg_groups: string[];
  types: string[];
}

function PokemonView() {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pokemonUrl =
    "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/";
  const query = `
    query getPokemonData($id: Int!) {
      gen3_species: pokemon_v2_pokemonspecies(where: {id: {_eq: $id}}) {
        name
        id
        evolution_chain_id
        evolves_from_species_id
        capture_rate
        base_happiness
        pokemon_v2_pokemonegggroups {
          pokemon_v2_egggroup {
            name
          }
        }
        pokemon_v2_pokemons {
          height
          weight
          pokemon_v2_pokemontypes {
            pokemon_v2_type {
              name
            }
          }
        }
      }
    }
  `;

  useEffect(() => {
    fetch("https://beta.pokeapi.co/graphql/v1beta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { id: parseInt(id || "0") } }),
    })
      .then((response) => response.json())
      .then((data) => {
        const species = data.data.gen3_species[0];
        const pokemonData: Pokemon = {
          id: species.id,
          name: species.name,
          evolution_chain_id: species.evolution_chain_id,
          evolves_from_species_id: species.evolves_from_species_id,
          capture_rate: species.capture_rate,
          base_happiness: species.base_happiness,
          height: species.pokemon_v2_pokemons[0].height,
          weight: species.pokemon_v2_pokemons[0].weight,
          egg_groups: species.pokemon_v2_pokemonegggroups.map(
            (group: any) => group.pokemon_v2_egggroup.name
          ),
          types: species.pokemon_v2_pokemons[0].pokemon_v2_pokemontypes.map(
            (type: any) => type.pokemon_v2_type.name
          ),
        };
        setPokemon(pokemonData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography variant="h6">Error: {error}</Typography>;

  return (
    <Box sx={{ width: "100%", padding: 0 }}>
      <Box sx={{ width: "100%", padding: 0 }}>
        <Header search={false} />
      </Box>
      <Box sx={{ padding: 2, textAlign: "center" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="h6">#{pokemon?.id}</Typography>
          <Typography variant="h1">
            {pokemon?.name && capitalizeFirstLetter(pokemon?.name)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <img
            src={`${pokemonUrl}${String(pokemon?.id).padStart(3, "0")}.png`}
            alt={pokemon?.name}
            style={{ width: "200px", height: "200px" }}
          />
        </Box>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{ marginTop: 2 }}
        >
          <Grid item>
            <Typography variant="body1">
              Capture Rate: {pokemon?.capture_rate}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">
              Base Happiness: {pokemon?.base_happiness}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">Height: {pokemon?.height}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">Weight: {pokemon?.weight}</Typography>
          </Grid>
        </Grid>
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="body1">Egg Groups:</Typography>
          {pokemon?.egg_groups.map((group) => (
            <PokemonType key={group} type={group} />
          ))}
        </Box>
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="body1">Types:</Typography>
          {pokemon?.types.map((type) => (
            <PokemonType key={type} type={type} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default PokemonView;
