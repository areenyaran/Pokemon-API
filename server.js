const express = require("express");
const axios = require("axios");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  try {
    const responses = await axios.all([
      axios.get("https://pokeapi.co/api/v2/pokemon/1"),
      axios.get("https://pokeapi.co/api/v2/pokemon/25"),
      axios.get("https://pokeapi.co/api/v2/pokemon/132"),
    ]);
    const pokemons = responses.map((response) => response.data);

    console.log("--------------------");
    pokemons.forEach((pokemon) => {
      console.log(`Pokemon Name: ${pokemon.name}`);
      console.log(`Pokemon Order: ${pokemon.order}`);
      console.log("Pokemon Abilities:");
      pokemon.abilities.forEach((ability) => {
        console.log(`- ${ability.ability.name}`);
      });
      console.log("--------------------");
    });

    res.render("index", { pokemons });
  } catch (error) {
    console.error(error);
  }
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});