import { render, screen } from "@testing-library/react";
import Index, { getStaticProps } from "../pages/index";

describe("Index", () => {
  describe("Component", () => {
    it("it must render", () => {
      const { getByTestId } = render(
        <Index
          pokemones={[{ name: "some pokemon", url: "/example-api/pokemon/1" }]}
        />
      );

      const headline = getByTestId("title");
      expect(headline).toBeInTheDocument();

      const pokemon = screen.getByText("some pokemon");
      // console.log(pokemon.getAttribute("href"));
      expect(pokemon).toBeInTheDocument();

      const url = pokemon.getAttribute("href");
      expect(url).toEqual("/pokemones/1");
    });
  });

  describe("getStaticProps", () => {
    it("it must return pokemones", async () => {
      global.fetch = jest.fn().mockImplementation((url) => {
        expect(url).toBe("https://pokeapi.co/api/v2/pokemon/?limit=151");
        return new Promise((resolve) => {
          resolve({
            json: () =>
              Promise.resolve({
                results: "list of pokemones",
              }),
          });
        });
      });

      const { props } = await getStaticProps();
      // console.log(props);
      expect(props.pokemones).toBe("list of pokemones");
    });
  });
});
