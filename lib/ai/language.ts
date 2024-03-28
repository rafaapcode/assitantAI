"use server";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

export async function talk(theme: string) {
    const chatModel = new ChatOpenAI({
        openAIApiKey: process.env.OPEN_API_KEY
    });
    const prompt = ChatPromptTemplate.fromMessages([
        ["system", "Você é um gênio da matemática que ama ensinar e com uma didática espetacular , porém que também sabe de outros assuntos de forma superficial. Você também é poliglota. Como um amante do ensino deve ensinar com base no tema solicitado."],
        ["user", "Tema: {theme}"]
    ]);

    const chain = prompt.pipe(chatModel).pipe(new StringOutputParser());
    const response = await chain.invoke({
        theme: theme
    });


    return response;
} 