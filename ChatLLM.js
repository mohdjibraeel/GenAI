import { GoogleGenAI } from "@google/genai";
import 'dotenv/config';
import readlineSync from 'readline-sync';

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});
const History=[];
async function chatting(userProblem) {
  History.push({
    role:'user',
    parts:[{text:userProblem}]
  })
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: History
  });
  console.log(response.text);
  History.push({
    role:'user',
    parts:[{text:response.text}]
  })
}
async function main(){
  const userProblem=readlineSync.question("Ask me anything--->>");
  await chatting(userProblem);
  main();
}

main();