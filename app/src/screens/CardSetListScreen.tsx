import type { FC } from "react";

import type { CardSet } from "../types";

import styles from "./CardSetListScreen.module.css";

interface Props {
  cardSets: CardSet[];
  onSelect: (cardSet: CardSet) => void;
}

const CardSetListScreen: FC<Props> = ({ cardSets, onSelect }) => {
  return (
    <div className="screen">
      <h1 className={styles.appTitle}>フラッシュカード</h1>
      <ul className={styles.cardSetList}>
        {cardSets.map((cs) => (
          <li key={cs.id}>
            <button type="button" className={styles.cardSetItem} onClick={() => onSelect(cs)}>
              <span className={styles.cardSetTitle}>{cs.title}</span>
              <span className={styles.cardSetCount}>{cs.cards.length}枚</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardSetListScreen;
