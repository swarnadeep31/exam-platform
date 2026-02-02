import { Question } from "@/types/question";

export async function getQuestions(): Promise<Question[]>{
    const res = await fetch("http://localhost:5000/api/questions",{
        cache: "no-store"
    })

    if(!res.ok){
        throw new Error("Failed to fetch questions")
    }
    return res.json()
}