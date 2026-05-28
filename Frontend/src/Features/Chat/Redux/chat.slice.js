import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",

    initialState: {
        activeConversationId: null,
        conversations: [],
        messages: {},
        loading: false,
        error: null,
    },

    reducers: {
        setActiveConversationId: (state, action) => {
            state.activeConversationId = action.payload;
        },

        addConversations: (state, action) => {
            const { convoId, convo, mode = "casual" } = action.payload;

            const exists = state.conversations.find(
                (c) => c.convoId === convoId
            );

            if (!exists) {
                state.conversations.unshift({
                    convoId,
                    convo,
                    mode,
                });
            }
        },

        setConversations: (state, action) => {
            state.conversations = action.payload;
        },

        addMessages: (state, action) => {
            const { chatId, message, role } = action.payload;

            if (!state.messages[chatId]) {
                state.messages[chatId] = [];
            }

            state.messages[chatId].push({
                message,
                role,
            });
        },

        setConversationMessages: (state, action) => {
            const { chatId, messages } = action.payload;
            state.messages[chatId] = messages;
        },

        appendMessageChunk: (state, action) => {
            const { chatId, chunk, role } = action.payload;

            if (!state.messages[chatId]) {
                state.messages[chatId] = [];
            }

            const messages = state.messages[chatId];

            if (
                messages.length &&
                messages[messages.length - 1].role === role
            ) {
                messages[messages.length - 1].message.content += chunk;
            } else {
                messages.push({
                    message: { content: chunk },
                    role,
                });
            }
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        setError: (state, action) => {
            state.error = action.payload;
        },

        deleteConversation: (state, action) => {
            const conversationId = action.payload;

            state.conversations = state.conversations.filter(
                (c) => c.convoId !== conversationId
            );

            delete state.messages[conversationId];

            if (state.activeConversationId === conversationId) {
                state.activeConversationId = null;
            }
        },
    },
});

export const {
    setActiveConversationId,
    addConversations,
    setConversations,
    addMessages,
    appendMessageChunk,
    setConversationMessages,
    setLoading,
    setError,
    deleteConversation,
} = chatSlice.actions;

export default chatSlice.reducer;