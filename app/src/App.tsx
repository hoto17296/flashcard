import { useState, type FC } from "react";

import CardSetListScreen from "./screens/CardSetListScreen";
import type { CardSet, Card, OrderMode } from "./types";

const modules = import.meta.glob("./data/*.json", { eager: true });
const cardSets: CardSet[] = Object.values(modules)
  .map((m) => (m as { default: CardSet }).default)
  .sort((a, b) => a.order - b.order);
import CardSetTopScreen from "./screens/CardSetTopScreen";
import CardViewScreen from "./screens/CardViewScreen";

type Screen =
  | { name: "list" }
  | { name: "top"; cardSet: CardSet }
  | { name: "view"; cardSet: CardSet; cards: Card[] };

function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const App: FC = () => {
  const [screen, setScreen] = useState<Screen>({ name: "list" });

  const handleSelectCardSet = (cardSet: CardSet) => {
    setScreen({ name: "top", cardSet });
  };

  const handleStart = (cardSet: CardSet, orderMode: OrderMode) => {
    const cards = orderMode === "shuffle" ? shuffle(cardSet.cards) : [...cardSet.cards];
    setScreen({ name: "view", cardSet, cards });
  };

  const handleBackToList = () => {
    setScreen({ name: "list" });
  };

  const handleBackToTop = (cardSet: CardSet) => {
    setScreen({ name: "top", cardSet });
  };

  if (screen.name === "list") {
    return <CardSetListScreen cardSets={cardSets} onSelect={handleSelectCardSet} />;
  }

  if (screen.name === "top") {
    return (
      <CardSetTopScreen
        cardSet={screen.cardSet}
        onStart={(orderMode) => handleStart(screen.cardSet, orderMode)}
        onBack={handleBackToList}
      />
    );
  }

  return <CardViewScreen cards={screen.cards} onFinish={() => handleBackToTop(screen.cardSet)} />;
};

export default App;
