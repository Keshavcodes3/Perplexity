import { ChatMistralAI } from "@langchain/mistralai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatGroq } from "@langchain/groq";
import { SystemMessage, AIMessage, HumanMessage } from "langchain"
import { createConvoTitle, messageResponse } from "../Prompts/conversation.prompt.js";



/*-------------------Models------------------- */

const mistralModel = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey: process.env.MISTRAL_API_KEY
})


const geminiModel = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    apiKey: process.env.GEMINI_API_KEY
});

const groqModel = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "llama-3.1-8b-instant"
});





/*-----------------------Functions to create Chat Title-------------------- */

export const generateChatTitle = async ({ message }) => {
    try {
        const aiPrompt = createConvoTitle()
        const res = mistralModel.invoke([
            new SystemMessage(aiPrompt),
            new HumanMessage(message)
        ])
        return (await res).content || "New chat"
    } catch (err) {
        console.error("Mistral title generation failed:", err.message);
        return "New chat";
    }
}




/*--------------Functions to generate actual response of message------------- */

const formattedMessage = ({ messages }) => {
    const message = messages.map((msg) => {
        if (msg.role == "ai") {
            return new AIMessage(msg.content)
        }
        return new HumanMessage(msg.content)
    })
    return message
}


export const generateMessageResponse = async ({ messages, res }) => {
    const message = formattedMessage({ messages })
    try {
        const prompt = messageResponse()
        const response = await groqModel.stream([
            new SystemMessage(prompt),
            ...message
        ])
        let accumulatedText = "";
        for await (const chunk of response) {
            const text = chunk.content || ""
            accumulatedText += text;
            res.write(JSON.stringify({ type: 'chunk', text }) + '\n')
        }
        return accumulatedText;
    } catch (err) {
        //Fallback
        try {
            const prompt = messageResponse()
            const response = await geminiModel.stream([
                new SystemMessage(prompt),
                ...message
            ])
            let accumulatedText = "";
            for await (const chunk of response) {
                const text = chunk.text || ""
                accumulatedText += text;
                res.write(JSON.stringify({ type: 'chunk', text }) + '\n')
            }
            return accumulatedText;
        } catch (err) {
            throw err;
        }
    }
}