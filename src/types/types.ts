export type TStory = {
  id: number;
  title: string;
  url: string;
  score: number;
  by: string;
  time: number;
  descendants: number;
  kids: number[];
}

export type TComment = {
  id: number;
  by: string;
  text: string;
  time: number;
  kids?: number[];
};
