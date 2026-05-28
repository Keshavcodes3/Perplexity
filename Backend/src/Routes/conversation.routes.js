import express from "express";
import {
    createEmptyConversation,
    createFirstConversation,
    deleteConversation,
    getAllConversations,
    getOneConversation,
    takeFollowUp,
    updateConversationMode,
} from "../Controllers/conversation.controller.js";
import { IdentifyUser } from "../Middlewares/auth.middleware.js";

const conversationRouter = express.Router();

conversationRouter.post("/", IdentifyUser, createFirstConversation);
conversationRouter.post("/empty", IdentifyUser, createEmptyConversation);
conversationRouter.post("/sendMessage/:conversationId", IdentifyUser, takeFollowUp);
conversationRouter.patch("/:conversationId/mode", IdentifyUser, updateConversationMode);
conversationRouter.delete("/delete/:conversationId", IdentifyUser, deleteConversation);
conversationRouter.get("/all", IdentifyUser, getAllConversations);
conversationRouter.get("/:conversationId", IdentifyUser, getOneConversation);

export default conversationRouter;
