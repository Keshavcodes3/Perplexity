import express from "express";
import { createFirstConversation, deleteConversation, getAllConversations, getOneConversation, takeFollowUp } from "../Controllers/conversation.controller.js";
import { IdentifyUser } from "../Middlewares/auth.middleware.js";

const conversationRouter = express.Router();

conversationRouter.post("/", IdentifyUser, createFirstConversation);

conversationRouter.post("/sendMessage/:conversationId",IdentifyUser,takeFollowUp)

conversationRouter.delete('/delete/:conversationId',IdentifyUser,deleteConversation)

conversationRouter.get('/all',IdentifyUser,getAllConversations)

conversationRouter.get('/:conversationId',IdentifyUser,getOneConversation)

export default conversationRouter;
