import QuizClient from "@/components/QuizClient";
import { API_BASE_URL } from "@/lib/config";
import { Question } from "@/types/question";

async function getQuestions(): Promise<Question[]> {
  const res = await fetch(`${API_BASE_URL}/api/questions`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch questions");
  }

  return res.json();
}

export default async function Page() {
  const questions = await getQuestions();

  return <QuizClient questions={questions} />;
}
