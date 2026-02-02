export interface Question {
  _id: string;
  question: string;
  options: string[];
  correctOption: number;
  difficulty: "easy" | "medium" | "hard";
  topic: string;
  marks: number;
}
