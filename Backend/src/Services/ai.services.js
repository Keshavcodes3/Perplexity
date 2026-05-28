import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatGroq } from "@langchain/groq";
import { AIMessage, HumanMessage, SystemMessage } from "langchain";
import { FirstMessageResponse } from "../Prompts/conversation.prompt.js";

const geminiModel = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    apiKey: process.env.GEMINI_API_KEY,
});

const groqModel = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "llama-3.1-8b-instant",
});

const asLangChainMessages = ({ messages }) => {
    return messages.map((msg) => {
        if (msg.role === "ai") {
            return new AIMessage(msg.content);
        }

        return new HumanMessage(msg.content);
    });
};

const extractChunkText = (chunk) => {
    const content = chunk?.content ?? chunk?.text ?? "";

    if (typeof content === "string") {
        return content;
    }

    if (Array.isArray(content)) {
        return content
            .map((part) => {
                if (typeof part === "string") return part;
                return part?.text ?? "";
            })
            .join("");
    }

    return "";
};

const streamModelResponse = async ({ model, messages, mode, res }) => {
    const response = await model.stream([
        new SystemMessage(FirstMessageResponse({ mode })),
        ...asLangChainMessages({ messages }),
    ]);

    let accumulatedText = "";

    for await (const chunk of response) {
        const text = extractChunkText(chunk);
        if (!text) continue;

        accumulatedText += text;
        res.write(JSON.stringify({ type: "chunk", text }) + "\n");
    }

    return accumulatedText;
};

export const generateChatTitle = ({ message }) => {
    const words = message
        .trim()
        .replace(/\s+/g, " ")
        .split(" ")
        .slice(0, 6)
        .join(" ");

    return words || "New chat";
};

export const generateMessageResponse = async ({ messages, res, mode = "casual" }) => {
    try {
        return await streamModelResponse({ model: groqModel, messages, mode, res });
    } catch (groqError) {
        console.error("Groq stream failed, falling back to Gemini:", groqError?.message);
        return await streamModelResponse({ model: geminiModel, messages, mode, res });
    }
};
