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


export const { setActiveConversationId, setError, setLoading, deleteConversation, addConversations, addMessages } = chatSlice.actions

export default chatSlice.reducer