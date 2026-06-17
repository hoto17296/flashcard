export interface Card {
  question: string;
  answer: string;
}

export interface CardSet {
  id: string;
  title: string;
  order: number;
  description?: string;
  cards: Card[];
}

export type OrderMode = "sequential" | "shuffle";
