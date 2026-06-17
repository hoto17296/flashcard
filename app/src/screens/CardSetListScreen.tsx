import { useState, type FC } from "react";

import type { CardSet } from "../types";

import styles from "./CardSetListScreen.module.css";

interface Props {
  cardSets: CardSet[];
  onSelect: (cardSet: CardSet) => void;
}

const CardSetListScreen: FC<Props> = ({ cardSets, onSelect }) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = [...new Set(cardSets.flatMap((cs) => cs.tags ?? []))];

  const filtered =
    selectedTag === null ? cardSets : cardSets.filter((cs) => cs.tags?.includes(selectedTag));

  const handleTagClick = (tag: string) => {
    setSelectedTag((prev) => (prev === tag ? null : tag));
  };

  return (
    <div className="screen">
      <h1 className={styles.appTitle}>フラッシュカード</h1>
      {allTags.length > 0 && (
        <div className={styles.tagFilter}>
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`${styles.tagButton} ${selectedTag === tag ? styles.active : ""}`}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
      <ul className={styles.cardSetList}>
        {filtered.map((cs) => (
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
