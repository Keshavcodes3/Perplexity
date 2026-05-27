import { ChatMistralAI } from "@langchain/mistralai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { SystemMessage, AIMessage, HumanMessage } from "langchain"
import { createConvoTitle, messageResponse } from "../Prompts/conversation.prompt";



/*-------------------Models------------------- */

const mistralModel = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey: process.env.MISTRAL_API_KEY
})


const geminiModel = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    apiKey: process.env.GEMINI_API_KEY
});





/*-----------------------Functions to create Chat Title-------------------- */

export const generateChatTitle = async ({ message }) => {
    const aiPrompt = createConvoTitle()
    const res = mistralModel.invoke([
        new SystemMessage(aiPrompt),
        new HumanMessage(message)
    ])
    return (await res).content || "New chat"
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


export const generateMessageResponse = async ({ messages }) => {
    const message = formattedMessage({ messages })
    try {
        const prompt = messageResponse()
        const response = await geminiModel.invoke([
            new SystemMessage(prompt),
            ...message
        ])
        return response.content
    } catch (err) {
        //Fallback
        try {
            const prompt = messageResponse()
            const response = await geminiModel.invoke([
                new SystemMessage(prompt),
                ...message
            ])
            return response.content
        } catch (err) {
            return res.status(500).json({
                message: "Internal server error",
                error: process.env.MODE == "dev" ? err?.message : "Something went wrong"
            })
        }
    }
}