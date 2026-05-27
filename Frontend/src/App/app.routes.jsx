import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App.jsx';
import Register from '../Features/Authentication/Pages/Register.jsx';
import Login from '../Features/Authentication/Pages/Login.jsx';
import ChatPage from '../Features/Chat/Pages/ChatPage.jsx';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/chat" replace />
    },
    {
        path: "/chat",
        element: <ChatPage/>
    },
    {
        path: "/register",
        element:<Register/>
    },
    {
        path:'/login',
        element:<Login/>
    }
]);