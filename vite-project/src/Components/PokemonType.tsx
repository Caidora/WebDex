
import { Chip } from "@mui/material";

export function getTypeColor(type: string): string {
  const typeColors: { [key: string]: string } = {
    normal: "#A8A878",
    fighting: "#C03028",
    flying: "#A890F0",
    poison: "#A040A0",
    ground: "#E0C068",
    rock: "#B8A038",
    bug: "#A8B820",
    ghost: "#705898",
    steel: "#B8B8D0",
    fire: "#F08030",
    water: "#6890F0",
    grass: "#78C850",
    electric: "#F8D030",
    psychic: "#F85888",
    ice: "#98D8D8",
    dragon: "#7038F8",
    dark: "#705848",
    fairy: "#EE99AC",
    stellar: "#FFD700",
    unknown: "#68A090",
  };
  return typeColors[type] || "#A8A878";
}

function hexToRgb(hex: string): number[] {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255,
      ]
    : [0, 0, 0];
}

function getLuminance(color: string): number {
  if (color.startsWith("#")) {
    const rgb = hexToRgb(color);
    const [r, g, b] = rgb.map((c) =>
      c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    );
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  return 0;
}

export function getTextColor(backgroundColor: string): string {
  return getLuminance(backgroundColor) > 0.5 ? "black" : "white";
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

interface PokemonTypeProps {
  type: string;
}

export function PokemonType({ type }: PokemonTypeProps) {
  const backgroundColor = getTypeColor(type);
  const textColor = getTextColor(backgroundColor);

  return (
    <Chip
      label={type}
      size="small"
      sx={{
        backgroundColor: backgroundColor,
        color: textColor,
      }}
    />
  );
}
