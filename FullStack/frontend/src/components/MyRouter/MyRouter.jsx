import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { toast } from "react-toastify";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Layout from "../Layout/Layout";
import Dashboard from "../Dashboard/Dashboard";
import UserDashboardNew from "../UserDashboardNew/UserDashboardNew";
import UserLayout from "../UserLayout/UserLayout";
import CoursePage from "../../pages/CoursePage/CoursePage";
import QuizPage from "../../pages/QuizPage/QuizPage";
import DiscussionPage from "../../pages/DiscussionPage/DiscussionPage";
import DepartmentPage from "../../pages/DepartmentPage/Department";
import BlogPage from "../../pages/BlogPage/BlogPage";
import Teams from "../Teams/Teams";
import UserList from "../UserList/UserList";
import { SessionProvider } from "../../context/SessionContext";
function MyRouter() {
  const notify = (message) => {
    message.success ? toast(message.success) : toast.error(message.error);
  };
  const { user } = useUser();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login showToast={notify} />} />
          <Route path="/register" element={<Register showToast={notify} />} />
          {user.isAdmin ? (
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/departments"
                element={<DepartmentPage showToast={notify} />}
              />
              <Route path="/teams" element={<Teams showToast={notify} />} />
              <Route path="/users" element={<UserList />} /> */}
              <Route path="/user/:id" element={<UserDashboardNew />} /> */}
              {/* <Route path="*" element={<Navigate to="/dashboard" replace />} /> */}
            </Route>
          ) : (
            // <Route element={<UserLayout />}>
            //   <Route path="/dashboard" element={<UserDashboard />} />

            //   <Route
            //     path="/userSkills"
            //     element={<UserSkillsPage showToast={notify} />}
            //   />
            //   <Route path="*" element={<Navigate to="/dashboard" replace />} />
            // </Route>
            <Route element={<UserLayout />}>
              {/* Use a wrapper component to include SessionProvider */}
              <Route
                path="*"
                element={
                  <SessionProvider>
                    <Routes>
                      <Route
                        path="/dashboard/:id"
                        element={<UserDashboardNew />}
                      />
                      <Route
                        path="/courses"
                        element={<CoursePage showToast={notify} />}
                      />
                      <Route
                        path="/courses/:courseId/:learningMaterialId"
                        element={<BlogPage showToast={notify} />}
                      />
                      <Route
                        path="/quiz/:courseId"
                        element={<QuizPage showToast={notify} />}
                      />
                      <Route
                        path="/discussion/:courseId"
                        element={<DiscussionPage />}
                      />
                      {/* <Route
                        path="*"
                        element={<Navigate to="/dashboard" replace />}
                      /> */}
                    </Routes>
                  </SessionProvider>
                }
              />
            </Route>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default MyRouter;
