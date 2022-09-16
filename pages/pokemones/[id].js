import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useIsMounted } from "../../hooks/useIsMounted"

export default function Pokemon({ data }) {
  const router = useRouter()
  const isMounted = useIsMounted()
  console.log({ data }, { router })

  if (router.isFallback || !isMounted) {
    return <p>Cargando...</p>
  }

  return (
    <div>
      <h1>
        {data.name} número #{data.id}
      </h1>
      <Image src={data.sprites.front_default} width={400} height={400} />
      <br />
      <Link href="/">Volver a inicio</Link>
    </div>
  )
}

export const getStaticProps = async ({ params }) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
  const data = await response.json()

  return {
    props: {
      data,
    },
  }
}

export const getStaticPaths = () => {
  const paths = [{ params: { id: "1" } }, { params: { id: "2" } }]

  return {
    paths: paths,
    fallback: true, // use "blocking" for wait until HTML is generated
  }
}

// export const getServerSideProps = async ({ params }) => {
//   const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
//   const data = await response.json()

//   return {
//     props: {
//       data,
//     },
//   }
// }
