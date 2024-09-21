import { useState, useEffect } from 'react'
import { PokemonCardList } from './Components/PokemonCardList'
import { Box } from '@mui/material'
import './App.css'

interface Pokemon {
  id: number
  name: string
  types: string[]
}

function App() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([])

  const pokemonUrl = "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/"

  const query = `
  query samplePokeAPIquery {
    gen3_species: pokemon_v2_pokemonspecies(
      where: { pokemon_v2_generation: { name: { _eq: "generation-i" } } },
      order_by: { id: asc }
    ) {
      name
      id
    }
    pokemon_v2_pokemontype(limit: 151) {
      type_id
      pokemon_id
      id
      pokemon_v2_type {
        name
      }
    }
  }
  `

  useEffect(() => {
    fetch('https://beta.pokeapi.co/graphql/v1beta', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    })
      .then(response => response.json())
      .then(data => {
        const pokemonData = data.data.gen3_species.map((species: any) => ({
          id: species.id,
          name: species.name,
          types: data.data.pokemon_v2_pokemontype
            .filter((type: any) => type.pokemon_id === species.id)
            .map((type: any) => type.pokemon_v2_type.name)
        }))
        setPokemon(pokemonData)
      })
      .catch(error => console.error('Error:', error))
  }, [])

  return (
    <Box>
      <PokemonCardList pokemon={pokemon} />
    </Box>
  )
}

export default App
