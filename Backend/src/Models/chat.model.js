import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation"
    },
    role: {
        type: String,
        default: "user",
        required: true,
        enum: ["ai", "user"]
    },
    content: {
        type: String,
        required: true
    }
},{timeStamps:true})


const chatModel=mongoose.model("Chat",chatSchema)

export default chatModel