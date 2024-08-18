import { Navigate, createBrowserRouter } from "react-router-dom";
import HomePage from "../components/pages/homePage/HomePage";
import SignInPage from "../components/pages/signInPage/SignInPage";
import SignUpPage from "../components/pages/signUpPage/SignUpPage";
import PostsPage from "../components/pages/postsPage/PostsPage";

export default class Router {
    publicRoutes() {
        return createBrowserRouter([
            {
                path:'/',
                element:<HomePage/>,
                errorElement:<Navigate to={'/'} replace={true}/>
            },
            {
                path:'/auth/signin',
                element:<SignInPage/>
            },
            {
                path:'/auth/signup',
                element:<SignUpPage/>
            }
        ])
    }

    privateRoutes() {
        return createBrowserRouter([
            {
                path:'/',
                element:<Navigate to={'/posts'} replace={true}/>,
                errorElement:<Navigate to={'/posts'} replace={true}/>
            },
            {
                path:'/posts',
                element:<PostsPage/>
            }
        ])
    } 
}