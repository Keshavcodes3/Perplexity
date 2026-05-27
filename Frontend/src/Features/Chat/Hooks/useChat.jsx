import {useDispatch, useSelector} from 'react-redux'
import { addConversations, addMessages, setActiveConversationId, setError, setLoading, appendMessageChunk } from '../Redux/chat.slice'
import { getAllConversations, getAllMessages, streamStartChat, streamTakeFollowUp } from '../Services/chat.service'

export const useChat=()=>{
    const dispatch=useDispatch()

    const startChatHook=async(payload)=>{
        return new Promise(async (resolve) => {
            try {
                dispatch(setLoading(true));
                dispatch(setError(null));
                const {message} = payload;
                
                let currentConvoId = null;

                await streamStartChat(
                    message,
                    (startData) => {
                        currentConvoId = startData.conversationId;
                        dispatch(setActiveConversationId(currentConvoId));
                        dispatch(addConversations({
                            convoId: currentConvoId,
                            convo: startData.title
                        }));
                        dispatch(addMessages({
                            chatId: currentConvoId,
                            message: { content: message },
                            role: "user"
                        }));
                        dispatch(addMessages({
                            chatId: currentConvoId,
                            message: { content: "" },
                            role: "ai"
                        }));
                        // We intentionally DO NOT set loading to false here so the typing indicator stays visible
                    },
                    (chunkText) => {
                        if (currentConvoId) {
                            dispatch(appendMessageChunk({
                                chatId: currentConvoId,
                                chunk: chunkText,
                                role: "ai"
                            }));
                        }
                    },
                    (doneData) => {
                        dispatch(setLoading(false));
                        resolve(doneData);
                    },
                    (errMessage) => {
                        if (currentConvoId) {
                            dispatch(appendMessageChunk({
                                chatId: currentConvoId,
                                chunk: `\n\n⚠️ **Error:** ${errMessage}`,
                                role: "ai"
                            }));
                        }
                        dispatch(setError(errMessage));
                        dispatch(setLoading(false));
                        resolve({ success: false, error: errMessage });
                    }
                );
            } catch (err) {
                dispatch(setError(err?.message));
                dispatch(setLoading(false));
                resolve({ success: false, error: err?.message });
            }
        });
    }

    const takeFollowUpHook=async({conversationId,message})=>{
        return new Promise(async (resolve) => {
            try {
                dispatch(setLoading(true));
                dispatch(setError(null));
                dispatch(setActiveConversationId(conversationId));
                
                dispatch(addMessages({
                    chatId: conversationId,
                    message: { content: message },
                    role: "user"
                }));
                dispatch(addMessages({
                    chatId: conversationId,
                    message: { content: "" },
                    role: "ai"
                }));
                // We intentionally DO NOT set loading to false here so the typing indicator stays visible

                await streamTakeFollowUp(
                    { conversationId, message },
                    (chunkText) => {
                        dispatch(appendMessageChunk({
                            chatId: conversationId,
                            chunk: chunkText,
                            role: "ai"
                        }));
                    },
                    (doneData) => {
                        dispatch(setLoading(false));
                        resolve(doneData);
                    },
                    (errMessage) => {
                        dispatch(appendMessageChunk({
                            chatId: conversationId,
                            chunk: `\n\n⚠️ **Error:** ${errMessage}`,
                            role: "ai"
                        }));
                        dispatch(setError(errMessage));
                        dispatch(setLoading(false));
                        resolve({ success: false, error: errMessage });
                    }
                );
            } catch (err) {
                dispatch(setError(err?.message));
                dispatch(setLoading(false));
                resolve({ success: false, error: err?.message });
            }
        });
    }
    const fetchChatHistory=async()=>{
        try{
            dispatch(setLoading(true))
            dispatch(setError(null))
            const data=await getAllConversations()
            if(data?.success){
                const {allConversations}=data
                console.log(allConversations)
                allConversations.forEach((convo)=>{
                    dispatch(addConversations({
                        convoId:convo.convoId,
                        convo:convo.convo
                    }))
                })
            }else{
                dispatch(setError(data?.error || "Something went wrong"))

            }
        }catch(err){
            dispatch(setError(err?.message || "Something went wrong"))
        }finally{
            dispatch(setLoading(false))
        }
    }

    const getAllChats=async({conversationId})=>{
        try{
            dispatch(setLoading(true))
            dispatch(setError(null))
            const data=await getAllMessages({conversationId})
            if(!data?.success){
                dispatch(setError(data?.error || "Something went wrong"))
            }
            data.chats.forEach((chat)=>{
                dispatch(addMessages({
                    chatId:conversationId,
                    message:{ content: chat.content },
                    role:chat.role
                }))
            })


        }catch(err){
            dispatch(setError(err?.message || "Something went wrong"))
        }finally{
            dispatch(setLoading(false))
        }
    }
    return {startChatHook,takeFollowUpHook,fetchChatHistory,getAllChats}
}