import { createBrowserRouter } from "react-router";
import Register from "../Features/Auth/Pages/Register";
import Login from "../Features/Auth/Pages/Login";
import Dashboard from "../Features/Chat/Pages/Dashboard";
import Protected from "../Features/Auth/Components/Protected";


export const router=createBrowserRouter([
    {
        path:'/register',
        element:<Register/>
    },
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/',
        element:<Protected>
            <Dashboard/>
            </Protected>
    }
])