import { ChatQuestion, ChatResponse, Origin } from "../types/message";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../../.env.local" });
import clientPromise from "../lib/mongodb";

(async () => {
  let compiledResponses: ChatResponse[] = [];
  console.log(`- Connecting to MongoDB...`);
  const client = await clientPromise;
  const db = client.db("feedbackbot");

  const chatQuestions: ChatQuestion[] = [
    {
      message: "¿Cómo calificarías el servicio?",
      order: 1,
      disabled: true,
      suggestions: [
        { label: "Muy Bueno", inputValue: "Muy Bueno", value: 5 },
        { label: "Bueno", inputValue: "Bueno", value: 4 },
        { label: "Regular", inputValue: "Regular", value: 3 },
        { label: "Malo", inputValue: "Malo", value: 2 },
        { label: "Muy Malo", inputValue: "Muy Malo", value: 1 },
        { label: "Pésimo", inputValue: "Pésimo", value: 0 },
      ],
      lower: 0,
      higher: 5,
    },
    {
      message: "Que puedes decirme sobre tu compra ?",
      order: 2,
      disabled: false,
      suggestions: [],
      lower: 1,
      higher: 10,
    },
    {
      message: "¿Qué opinas sobre la atención al cliente?",
      order: 3,
      disabled: true,
      suggestions: [
        { label: "Muy Bueno", inputValue: "Muy Bueno", value: 5 },
        { label: "Bueno", inputValue: "Bueno", value: 4 },
        { label: "Regular", inputValue: "Regular", value: 3 },
        { label: "Malo", inputValue: "Malo", value: 2 },
        { label: "Muy Malo", inputValue: "Muy Malo", value: 1 },
        { label: "Pésimo", inputValue: "Pésimo", value: 0 },
      ],
      lower: 0,
      higher: 5,
    },
    {
      message: "¿Recomendarías nuestro producto a un amigo?",
      order: 4,
      disabled: true,
      suggestions: [
        { label: "Sí, totalmente", inputValue: "Sí, totalmente", value: 5 },
        { label: "Sí", inputValue: "Sí", value: 4 },
        { label: "Tal vez", inputValue: "Tal vez", value: 3 },
        { label: "No", inputValue: "No", value: 2 },
        {
          label: "Definitivamente no",
          inputValue: "Definitivamente no",
          value: 1,
        },
      ],
      lower: 0,
      higher: 5,
    },
    {
      message:
        "¿Cómo describirías la relación calidad-precio de nuestro producto?",
      order: 5,
      disabled: true,
      suggestions: [
        { label: "Excelente", inputValue: "Excelente", value: 5 },
        { label: "Buena", inputValue: "Buena", value: 4 },
        { label: "Aceptable", inputValue: "Aceptable", value: 3 },
        { label: "Mala", inputValue: "Mala", value: 2 },
        { label: "Muy mala", inputValue: "Muy mala", value: 1 },
      ],
      lower: 0,
      higher: 5,
    },
  ];

  await db.collection("questions").insertMany(chatQuestions);
  client.close();
})();
