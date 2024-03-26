import { ChatOpenAI } from "langchain/chat_models/openai";

const chat = new ChatOpenAI({
    openAIApiKey: process.env.OPEN_API_KEY
});