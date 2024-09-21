import { Box, Card, CardContent, Typography, Grid, Chip } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import { getTypeColor, getTextColor, capitalizeFirstLetter } from './pokemonType';

interface Pokemon {
  id: number;
  name: string;
  types: string[];
  height: number;
  weight: number;
}

interface PokemonCardListProps {
  pokemon: Pokemon[];
}

const StyledCard = styled(Card)(() => ({
  width: 200,
  borderWidth: 2,
  borderStyle: "solid",
  position: "relative",
}));

const StyledIdBox = styled(Box)(() => ({
  position: "absolute",
  top: 8,
  left: 8,
  backgroundColor: "#2196f3",
  borderRadius: "50%",
  width: 32,
  height: 32,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  fontSize: "0.75rem",
  fontWeight: "bold",
}));

const StyledTypography = styled(Typography)(() => ({
  textAlign: "center",
  fontSize: "1.25rem",
  fontWeight: "bold",
}));

const StyledImageBox = styled(Box)(({ theme }) => ({
  height: "auto",
  width: "100%",
  objectFit: "contain",
  marginTop: theme.spacing(2),
}));

const StyledInfoBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
}));

const StyledTypesBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
  flexWrap: "wrap",
  justifyContent: "center",
}));

export function PokemonCardList({ pokemon }: PokemonCardListProps) {
  const pokemonUrl =
    "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/";

  return (
    <Grid container spacing={2} justifyContent="center">
      {pokemon.map((p) => (
        <Grid item key={p.id} xs="auto">
          <Link to={`/pokemon/${p.id}`} style={{ textDecoration: "none" }}>
            <StyledCard sx={{ borderColor: getTypeColor(p.types[0]) }}>
              <CardContent>
                <StyledIdBox>#{p.id}</StyledIdBox>
                <StyledTypography variant="h5" component="div">
                  {capitalizeFirstLetter(p.name)}
                </StyledTypography>

                <StyledImageBox
                  component="img"
                  src={`${pokemonUrl}${String(p.id).padStart(3, "0")}.png`}
                  alt={p.name}
                />

                <StyledInfoBox>
                  <Chip
                    label={`Height: ${p.height}`}
                    size="small"
                    sx={{
                      backgroundColor: "#f5f5f5",
                      color: "black",
                      fontSize: "0.75rem",
                    }}
                  />
                  <Chip
                    label={`Weight: ${p.weight}`}
                    size="small"
                    sx={{
                      backgroundColor: "#f5f5f5",
                      color: "black",
                      fontSize: "0.75rem",
                    }}
                  />
                </StyledInfoBox>

                <StyledTypesBox>
                  {p.types.map((type) => {
                    const backgroundColor = getTypeColor(type);
                    const textColor = getTextColor(backgroundColor);
                    return (
                      <Chip
                        key={type}
                        label={type}
                        size="small"
                        sx={{
                          backgroundColor: backgroundColor,
                          color: textColor,
                        }}
                      />
                    );
                  })}
                </StyledTypesBox>
              </CardContent>
            </StyledCard>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}
