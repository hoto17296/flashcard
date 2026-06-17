import { useState, type FC } from "react";

import type { CardSet, OrderMode } from "../types";

import styles from "./CardSetTopScreen.module.css";

interface Props {
  cardSet: CardSet;
  onStart: (orderMode: OrderMode) => void;
  onBack: () => void;
}

const CardSetTopScreen: FC<Props> = ({ cardSet, onStart, onBack }) => {
  const [orderMode, setOrderMode] = useState<OrderMode>("sequential");

  return (
    <div className="screen">
      <button type="button" className={styles.backButton} onClick={onBack}>
        ← 一覧へ
      </button>
      <div className={styles.content}>
        <h2 className={styles.title}>{cardSet.title}</h2>
        {cardSet.description && <p className={styles.description}>{cardSet.description}</p>}
        <p className={styles.count}>{cardSet.cards.length}枚のカード</p>
        <div className={styles.orderModeSelector}>
          <p className={styles.orderModeLabel}>表示順</p>
          <div className={styles.orderModeButtons}>
            <button
              type="button"
              className={`${styles.orderModeButton} ${orderMode === "sequential" ? styles.active : ""}`}
              onClick={() => setOrderMode("sequential")}
            >
              順番通り
            </button>
            <button
              type="button"
              className={`${styles.orderModeButton} ${orderMode === "shuffle" ? styles.active : ""}`}
              onClick={() => setOrderMode("shuffle")}
            >
              シャッフル
            </button>
          </div>
        </div>
        <button type="button" className={styles.startButton} onClick={() => onStart(orderMode)}>
          スタート
        </button>
      </div>
    </div>
  );
};

export default CardSetTopScreen;
