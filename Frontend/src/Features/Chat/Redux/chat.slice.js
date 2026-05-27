import { createSlice } from "@reduxjs/toolkit"


const chatSlice = createSlice({
    name: "chat",
    initialState: {
        activeConversationId: null,
        conversations: [],
        messages: {},
        loading: false,
        streaming: false,
        error: null
    },
    reducers: {
        setActiveConversationId: (state, action) => {
            state.activeConversationId = action.payload
        },
        addConversations: (state, action) => {
            const {convoId,convo}=action.payload
            const data={
                convoId:convoId,
                convo:convo
            }
            state.conversations.unshift(data)
        },

        //Add messages to conversations
        addMessages: (state, action) => {
            const { chatId, message,role } = action.payload
            if (!state.messages[chatId]) {
                state.messages[chatId] = []
            } 
            const data={
                message:message,
                role:role
            }
            state.messages[chatId].push(data)
        },
        appendMessageChunk: (state, action) => {
            const { chatId, chunk, role } = action.payload;
            if (!state.messages[chatId]) {
                state.messages[chatId] = [];
            }
            const messages = state.messages[chatId];
            if (messages.length > 0 && messages[messages.length - 1].role === role) {
                if (!messages[messages.length - 1].message) messages[messages.length - 1].message = { content: "" };
                messages[messages.length - 1].message.content += chunk;
            } else {
                messages.push({ message: { content: chunk }, role: role });
            }
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        deleteConversation: (state, action) => {
            const conversationId = action.payload;

            state.conversations = state.conversations.filter(
                (c) => c._id !== conversationId
            );

            delete state.messages[conversationId];

            if (state.activeConversationId === conversationId) {
                state.activeConversationId = null;
            }
        },
    }
})


export const { setActiveConversationId, setError, setLoading, deleteConversation, addConversations, addMessages, appendMessageChunk } = chatSlice.actions

export default chatSlice.reducer