import { Navigate, createBrowserRouter } from "react-router-dom";
import HomePage from "../components/pages/homePage/HomePage";
import SignInPage from "../components/pages/signInPage/SignInPage";
import SignUpPage from "../components/pages/signUpPage/SignUpPage";
import PostsPage from "../components/pages/postsPage/PostsPage";
import FullPostPage from "../components/pages/fullPostPage/FullPostPage";
import AlbumsPage from "../components/pages/albumsPage/AlbumsPage";
import TodosPage from "../components/pages/todosPage/TodosPage";
import ProfilePage from "../components/pages/profilePage/ProfilePage";

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
            },
            {
                path:'/posts/:postId',
                element:<FullPostPage/>
            },
            {
                path:'/albums',
                element:<AlbumsPage/>
            },
            {
                path:'/todos',
                element:<TodosPage/>
            },
            {
                path:`/profile/:userId`,
                element:<ProfilePage/>
            }
        ])
    } 
}