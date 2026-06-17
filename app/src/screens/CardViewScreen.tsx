import { useState, type FC } from "react";

import type { Card } from "../types";

import styles from "./CardViewScreen.module.css";

interface Props {
  cards: Card[];
  onFinish: () => void;
}

const CardViewScreen: FC<Props> = ({ cards, onFinish }) => {
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const card = cards[index];
  const isLast = index === cards.length - 1;

  const handleNext = () => {
    if (isLast) {
      onFinish();
    } else {
      setIndex(index + 1);
      setShowAnswer(false);
    }
  };

  return (
    <div className={`screen ${styles.screen}`}>
      <button type="button" className={styles.backButton} onClick={onFinish}>
        ← 戻る
      </button>
      <div className={styles.progress}>
        {index + 1} / {cards.length}
      </div>
      <div className={styles.card}>
        <div className={styles.question}>{card.question}</div>
        {showAnswer && <div className={styles.answer}>{card.answer}</div>}
      </div>
      <div className={styles.actions}>
        {!showAnswer ? (
          <button type="button" className={styles.actionButton} onClick={() => setShowAnswer(true)}>
            答えを見る
          </button>
        ) : (
          <button type="button" className={styles.actionButton} onClick={handleNext}>
            {isLast ? "おわり" : "次のカードへ"}
          </button>
        )}
      </div>
    </div>
  );
};

export default CardViewScreen;
