import UserModel from "../Models/user.model.js";
import ConversationModel from "../Models/conversation.model.js";
import chatModel from "../Models/chat.model.js";
import { generateChatTitle, generateMessageResponse } from "../Services/ai.services.js";


export const createFirstConversation = async (req, res) => {
    try {
        const userId = req.user.id
        const user = await UserModel.findById(userId)
        if (!user) {
            return res.status(404).json({
                message: "No user found",
                success: false
            })
        }
        const { message } = req.body
        if (!message || message == null) {
            return res.status(400).json({
                message: "Message should be greater than one char",
                success: false
            })
        }
        const title = await generateChatTitle({ message })
        const result = await generateMessageResponse({
            messages: [{ role: "user", content: message }],
        });

        //?create convo and add userMessage / AiMessage
        const conversation = await ConversationModel.create({
            user: userId,
            title: title
        })
        const AIMessage = await chatModel.create({
            conversationId: conversation._id,
            role: "ai",
            content: result
        })
        const userMessage = await chatModel.create({
            conversationId: conversation._id,
            role: "user",
            content: message,
        });

        return res.status(201).json({
            message: "New conversation created",
            title: title,
            conversationId: conversation._id,
            conversation: conversation,
            content: {
                AIMessage: AIMessage,
                userMessage: userMessage
            },
            success: true
        })
    } catch (err) {
        return res.status(500).json({
            message: "Internal server Error",
            success: false,
            error: process.env.MODE == "dev" ? err?.message : "Something went wrong"
        })
    }
}


export const takeFollowUp = async (req, res) => {
    try {
        const userId = req.user.id
        const user = await UserModel.findById(userId)
        if (!user) {
            return res.status(404).json({
                message: "No user found",
                success: false
            })
        }
        const { conversationId } = req.params
        if (!conversationId || conversationId == null) {
            return res.status(400).json({
                message: "No conversation found",
                success: false
            })
        }
        const conversation = await ConversationModel.findById(conversationId)
        if (!conversation) {
            return res.status(400).json({
                message: "No conversation found",
                success: false
            })
        }
        const { message } = req.body
        const userMessage = await chatModel.create({
            conversationId: conversationId,
            role: "user",
            content: message
        })
        const allMessages = await chatModel.find({
            conversationId: conversationId
        })
        if (!allMessages || allMessages.length == 0) {
            return res.status(400).json({
                message: "No conversation found , try to create one",
                success: false
            })
        }
        if (!message) {
            return res.status(400).json({
                message: "No message provided",
                success: false
            })
        }

        const result = await generateMessageResponse({ messages: allMessages })
        const AiMessage = await chatModel.create({
            conversationId: conversationId,
            role: "ai",
            content: result
        })
        return res.status(201).json({
            message: "Message created",
            title: conversation.title,
            conversation: conversation,
            content: {
                AIMessage: AiMessage,
                userMessage: userMessage
            },
            success: true
        })
    } catch (err) {
        return res.status(500).json({
            message: "Internal server Error",
            success: false,
            error: process.env.MODE == "dev" ? err?.message : "Something went wrong"
        })
    }
}


export const deleteConversation = async (req, res) => {
    try {
        const userId = req.user.id
        const user = await UserModel.findById(userId)
        if (!user) {
            return res.status(404).json({
                message: "No user found",
                success: false
            })
        }
        const { conversationId } = req.params
        if (!conversationId || conversationId == null) {
            return res.status(400).json({
                message: "No conversation found",
                success: false
            })
        }
        const conversation = await ConversationModel.findById(conversationId)
        if (!conversation) {
            return res.status(400).json({
                message: "No conversation found",
                success: false
            })
        }
        await ConversationModel.findByIdAndDelete(conversationId)
        await chatModel.deleteMany({
            conversationId: conversationId
        });
        return res.status(200).json({
            message: "Conversation deleted successfully",
            success: true
        })
    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: process.env.MODE == "dev" ? err.message : "Something went wrong"
        })
    }
}

export const getAllConversations = async (req, res) => {
    try {
        const userId = req.user.id
        const user = await UserModel.findById(userId)
        if (!user) {
            return res.status(404).json({
                message: "No user found",
                success: false
            })
        }
        const conversations = await ConversationModel.find({
            user: userId
        }).sort({ createdAt: -1 })

        const allConversations = []
        conversations.forEach((convo) => {
            const data = {
                convoId: convo._id,
                convo: convo.title
            }
            allConversations.push(data)
        })
        return res.status(200).json({
            message: "All conversations fetched successfully",
            allConversations: allConversations,
            success: true
        })
    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: process.env.MODE == "dev" ? err.message : "Something went wrong"
        })
    }
}


export const getOneConversation = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "No user found",
                success: false
            });
        }

        const { conversationId } = req.params;

        if (!conversationId) {
            return res.status(400).json({
                message: "No conversation found",
                success: false
            });
        }

        const conversation = await ConversationModel.findById(conversationId);

        if (!conversation) {
            return res.status(404).json({
                message: "No conversation found",
                success: false
            });
        }

        // security check
        if (conversation.user.toString() !== userId) {
            return res.status(403).json({
                message: "Unauthorized access",
                success: false
            });
        }

        const messages = await chatModel
            .find({ conversationId: conversationId })
            .sort({ createdAt: 1 });

        return res.status(200).json({
            message: "Conversation fetched successfully",
            title: conversation.title,
            conversationId: conversation._id,
            conversation,
            chats: messages,
            success: true
        });

    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error:
                process.env.MODE == "dev"
                    ? err.message
                    : "Something went wrong"
        });
    }
};