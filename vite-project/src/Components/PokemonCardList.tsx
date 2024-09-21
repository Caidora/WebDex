import { Box, Card, CardContent, Typography, Grid, Chip } from "@mui/material";

interface Pokemon {
  id: number;
  name: string;
  types: string[];
}

interface PokemonCardListProps {
  pokemon: Pokemon[];
}

function getTypeColor(type: string): string {
  const typeColors: { [key: string]: string } = {
    normal: "grey",
    fighting: "red",
    flying: "blue",
    poison: "purple",
    ground: "brown",
    rock: "grey",
    bug: "green",
    ghost: "purple",
    steel: "grey",
    fire: "red",
    water: "blue",
    grass: "green",
    electric: "yellow",
    psychic: "pink",
    ice: "lightblue",
    dragon: "orange",
    dark: "black",
    fairy: "pink",
    stellar: "gold",
    unknown: "grey"
  }
  return typeColors[type] || "grey"
}

export function PokemonCardList({ pokemon }: PokemonCardListProps) {
  const pokemonUrl =
    "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/"

  return (
    <Grid container spacing={2} justifyContent="center">
      {pokemon.map((p) => (
        <Grid item key={p.id} xs="auto">
          <Card
            sx={{
              width: 200,
              borderColor: getTypeColor(p.types[0]),
              borderWidth: 2,
              borderStyle: "solid",
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                {p.name}
              </Typography>

              <Box
                component="img"
                src={`${pokemonUrl}${String(p.id).padStart(3, "0")}.png`}
                alt={p.name}
                sx={{
                  height: "auto",
                  width: "100%",
                  objectFit: "contain",
                  marginTop: 2,
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 1,
                  marginTop: 2,
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {p.types.map((type) => (
                  <Chip
                    key={type}
                    label={type}
                    size="small"
                    sx={{
                      backgroundColor: getTypeColor(type),
                      color: "white",
                    }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
