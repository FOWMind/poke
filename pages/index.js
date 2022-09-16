import Link from "next/link"

function Pokemon({ pokemon }) {
  const id = pokemon.url
    .split("/")
    .filter((x) => x)
    .pop()

  return (
    <li>
      <Link href={`/pokemones/${id}`}>{pokemon.name}</Link>
    </li>
  )
}

export default function Home({ pokemones }) {
  return (
    <div>
      <h1>Pokemones</h1>
      <ul>
        {pokemones.map((pokemon) => (
          <Pokemon pokemon={pokemon} key={pokemon.name} />
        ))}
      </ul>
    </div>
  )
}

export const getStaticProps = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=151")
  const data = await res.json()

  return {
    props: {
      pokemones: data.results,
    },
  }
}
