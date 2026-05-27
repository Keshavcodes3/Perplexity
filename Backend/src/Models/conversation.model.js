import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
    title: {
        type: String,
        default: "New Chat",
    },
    projectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"s"
    }
}, { timeStamps: true })



const ConversationModel = mongoose.model("Conversation", conversationSchema);
export default ConversationModel 