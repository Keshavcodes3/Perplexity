import { useDispatch } from "react-redux";

import {
  addConversations,
  addMessages,
  appendMessageChunk,
  setConversations,
  setActiveConversationId,
  setConversationMessages,
  setError,
  setLoading,
} from "../Redux/chat.slice";

import {
  getAllConversations,
  getAllMessages,
  streamStartChat,
  streamTakeFollowUp,
  createEmptyConversationApi,
  updateConversationModeApi
} from "../Services/chat.service";

export const useChat = () => {
  const dispatch = useDispatch();

  const startChatHook = async ({ message, mode = "casual" }) => {
    return new Promise(async (resolve) => {
      try {
        dispatch(setLoading(true));
        dispatch(setError(null));

        let currentConvoId = null;

        await streamStartChat(
          { message, mode },

          (startData) => {
            currentConvoId = startData.conversationId;

            dispatch(setActiveConversationId(currentConvoId));

            dispatch(
              addConversations({
                convoId: currentConvoId,
                convo: startData.title,
                mode,
              })
            );

            dispatch(
              addMessages({
                chatId: currentConvoId,
                message: { content: message },
                role: "user",
              })
            );

            dispatch(
              addMessages({
                chatId: currentConvoId,
                message: { content: "" },
                role: "ai",
              })
            );
          },

          (chunk) => {
            dispatch(
              appendMessageChunk({
                chatId: currentConvoId,
                chunk,
                role: "ai",
              })
            );
          },

          (done) => {
            dispatch(setLoading(false));
            resolve(done);
          },

          (err) => {
            dispatch(setError(err));
            dispatch(setLoading(false));
            resolve({ success: false });
          }
        );
      } catch (err) {
        dispatch(setError(err.message));
        dispatch(setLoading(false));
      }
    });
  };

  const takeFollowUpHook = async ({
    conversationId,
    message,
    mode = "casual",
  }) => {
    return new Promise(async (resolve) => {
      try {
        dispatch(setLoading(true));

        dispatch(
          addMessages({
            chatId: conversationId,
            message: { content: message },
            role: "user",
          })
        );

        dispatch(
          addMessages({
            chatId: conversationId,
            message: { content: "" },
            role: "ai",
          })
        );

        await streamTakeFollowUp(
          { conversationId, message, mode },

          (chunk) => {
            dispatch(
              appendMessageChunk({
                chatId: conversationId,
                chunk,
                role: "ai",
              })
            );
          },

          (done) => {
            dispatch(setLoading(false));
            resolve(done);
          },

          (err) => {
            dispatch(setError(err));
            dispatch(setLoading(false));
          }
        );
      } catch (err) {
        dispatch(setError(err.message));
        dispatch(setLoading(false));
      }
    });
  };

  const fetchChatHistory = async () => {
    try {
      dispatch(setLoading(true));

      const data = await getAllConversations();

      if (data.success) {
        dispatch(setConversations(data.allConversations));
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  const getAllChats = async ({ conversationId }) => {
    try {
      dispatch(setLoading(true));

      const data = await getAllMessages({ conversationId });

      dispatch(
        setConversationMessages({
          chatId: conversationId,
          messages: data.chats.map((chat) => ({
            role: chat.role,
            message: {
              content: chat.content,
            },
          })),
        })
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const createEmptyChatHook = async ({ mode }) => {
    try {
      dispatch(setLoading(true));
      const data = await createEmptyConversationApi({ mode });
      
      if (data.success) {
        dispatch(setActiveConversationId(data.conversationId));
        dispatch(
          addConversations({
            convoId: data.conversationId,
            convo: data.title,
            mode: data.mode,
          })
        );
        dispatch(
          setConversationMessages({
            chatId: data.conversationId,
            messages: data.chats,
          })
        );
      }
      return data;
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const updateModeHook = async ({ conversationId, mode }) => {
    try {
      const data = await updateConversationModeApi({ conversationId, mode });
      return data;
    } catch (err) {
      console.error("Failed to update mode:", err);
    }
  };

  return {
    startChatHook,
    takeFollowUpHook,
    fetchChatHistory,
    getAllChats,
    createEmptyChatHook,
    updateModeHook,
  };
};