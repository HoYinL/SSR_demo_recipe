import React from "react";
import { useRoutes, Outlet } from "react-router-dom";
import UniversalCommonUI from "../pages/CommonComponent";
import BeforeLoginCommonUI from "../pages/BeforeLogin/commonComponent";
import LandingPage from "../pages/BeforeLogin/specificPage/LandingPage";
import LoginPage from "../pages/BeforeLogin/specificPage/UserState/LoginPage";
import SigninPage from "../pages/BeforeLogin/specificPage/UserState/SigninPage";
import LoginedCommonUI from "../pages/AfterLogin/commonComponent";
import LoginedLandingPage from "../pages/AfterLogin/specificPage/LandingPage";
import CreatePost from "../pages/AfterLogin/specificPage/CreatePost";
import EditProfile from "../pages/AfterLogin/specificPage/EditProfile";
import BlogContent from "../pages/AfterLogin/specificPage/BlogContent";
import SavedPost from "../pages/AfterLogin/specificPage/SavedPost";
import PublishedPost from "../pages/AfterLogin/specificPage/PublishedPost";
import UserPosts from "../pages/AfterLogin/specificPage/UserPost";
import MarkedPost from "../pages/AfterLogin/specificPage/MarkedPost";
import FollowingUser from "../pages/AfterLogin/specificPage/FollowingUser";

const RouteComp = [
  {
    path: "/",
    element: (
      <>
        <UniversalCommonUI />
        <Outlet />
      </>
    ),
      children: [
        {
          path: "/",
          element: (
            <>
              <BeforeLoginCommonUI />
              <Outlet />
            </>
          ), 
          children: [
            { path: "/", element:  <LandingPage /> },
            { path: "/login", element: <LoginPage /> },
            { path: "/signin", element: <SigninPage /> },
          ]
        },
        {
          path: "surfaceUI",
          element: (
            <>         
              <LoginedCommonUI />
              <Outlet />
            </>
          ), 
          children: [
            { path: ":userId/LandingPage/", element: <LoginedLandingPage /> },
            { path: ":userId/MarkedPost/", element: <MarkedPost /> },
            { path: ":userId/SavedPost/", element: <SavedPost /> },
            { path: ":userId/PublishedPost/", element: <PublishedPost /> },
            { path: "CreatePost/:userId/", element: <CreatePost /> },
            { path: "CreatePost/:userId/:postId", element: <CreatePost /> },
            { path: "EditPublishedPost/:userId/:postId", element: <CreatePost /> },
            { path: "AuthorPost/:userId", element: <UserPosts /> },
            { path: "EditProfile", element: <EditProfile />},
            { path: "Blog/:id/", element: <BlogContent />},
            { path: ":userId/FollowingUsers", element: <FollowingUser />}
          ]
        }
      ]
  }, 
]

const Router = () => {
  const routes = useRoutes(RouteComp);
  return routes
}

export default Router