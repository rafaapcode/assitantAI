import { ChatOpenAI } from "langchain/chat_models/openai";

const chatModel = new ChatOpenAI({
    openAIApiKey: process.env.OPEN_API_KEY
});