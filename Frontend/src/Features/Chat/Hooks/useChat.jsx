import {useDispatch, useSelector} from 'react-redux'
import { addConversations, addMessages, setActiveConversationId, setError, setLoading } from '../Redux/chat.slice'
import { getAllConversations, getAllMessages, startChat, takeFollowUp } from '../Services/chat.service'

export const useChat=()=>{
    const dispatch=useDispatch()

    const startChatHook=async(payload)=>{
        try{
            dispatch(setLoading(true))
            dispatch(setError(null));
            const {message}=payload
            const data=await startChat({message})
            if(data?.success){
                const convo=data.conversation
                const convoId=data.conversationId
                dispatch(setActiveConversationId(convoId))
                dispatch(addConversations({
                    convoId:convoId,
                    convo:convo
                }))
                dispatch(addMessages({
                    chatId:convoId,
                    message:data?.content?.userMessage,
                    role:"user"
                }))
                dispatch(addMessages({
                    chatId:convoId,
                    message:data?.content?.AIMessage,
                    role:"ai"
                }))
                return data
            }else{
                dispatch(setError(data?.error || "Something went wrong"))
            }
        }catch(err){
            dispatch(setError(err?.message))
        }finally{
            dispatch(setLoading(false))
        }
    }

    const takeFollowUpHook=async({conversationId,message})=>{
        try{
            dispatch(setLoading(true));
            dispatch(setError(null));
            dispatch(setActiveConversationId(conversationId));
            const data = await takeFollowUp({
                conversationId,
                message,
            });

            if (!data?.success) {
                dispatch(setError(data?.message));
                return;
            }
            dispatch(
                addMessages({
                    chatId: conversationId,
                    message: data?.content?.userMessage,
                    role:"user"
                })
            );

            dispatch(
                addMessages({
                    chatId: conversationId,
                    message: data?.content?.AIMessage,
                    role:"ai"
                })
            );

            return data;
        }catch(err){
            dispatch(setError(err?.message));
        }finally{
            dispatch(setLoading(false))
        }

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
                    message:chat.content,
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