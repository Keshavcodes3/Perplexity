/* eslint-disable no-unused-vars */
import { useDispatch } from "react-redux";

import { register, login, getMe } from '../Service/auth.service'
import { setUser, setError, setLoading } from '../auth.slice'


export function useAuth() {
    const dispatch = useDispatch()

    const handleRegister = async (payload) => {
        try {
            dispatch(setLoading(true))
            const data = await register(payload)
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Registration failed"))
        } finally {
            dispatch(setLoading(false))
        }
    }

    const handleLogin = async (payload) => {
        try {
            dispatch(setLoading(true))
            const data = await login(payload)
            dispatch(setUser(data.user))
        } catch (err) {
            dispatch(setError(err.response?.data?.message || "Login failed"))
        } finally {
            dispatch(setLoading(false))
        }
    }
    const handleGetMe = async () => {
        try {
            dispatch(setLoading(true))
            const data = await getMe()
            dispatch(setUser(data.user))
        } catch (err) {
            dispatch(setError(err.response?.data?.message || "User fetch failed"))
        } finally {
            dispatch(setLoading(false))
        }
    }
    return {handleRegister,handleGetMe,handleLogin}
}