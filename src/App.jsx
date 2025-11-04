import React, { useEffect, useState } from "react";
import Scoreboard from "./components/Scoreboard";
import Card from "./components/card";
import "./styles/App.css";

function App() {
  const [cards, setCards] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=15");
      const data = await res.json();
      const cardData = await Promise.all(
        data.results.map(async (pokemon) => {
          const pokeRes = await fetch(pokemon.url);
          const pokeData = await pokeRes.json();
          return {
            id: pokeData.id,
            name: pokeData.name,
            image: pokeData.sprites.front_default,
          };
        })
      );
      setCards(cardData);
    }
    fetchData();
  }, []);

  // Shuffle cards randomly
  const shuffleCards = (cardsArray) =>
    cardsArray.sort(() => Math.random() - 0.5);

  const handleCardClick = (id) => {
    if (clicked.includes(id)) {
      setScore(0);
      setClicked([]);
    } else {
      const newScore = score + 1;
      setScore(newScore);
      if (newScore > bestScore) setBestScore(newScore);
      setClicked([...clicked, id]);
    }
    setCards(shuffleCards([...cards]));
  };

  return (
    <div className="app">
      <h1>Memory Card Game</h1>
      <Scoreboard score={score} bestScore={bestScore} />
      <div className="card-grid">
        {cards.map((card) => (
          <Card key={card.id} card={card} handleClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
}

export default App;
