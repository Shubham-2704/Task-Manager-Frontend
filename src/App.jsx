import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";

import PrivateRoute from "./routes/PrivateRoute";
import Dashboard from "./pages/Admin/Dashboard";
import ManageTasks from "./pages/Admin/ManageTasks";
import CreateTask from "./pages/Admin/CreateTask";
import ManageUsers from "./pages/Admin/ManageUsers";

import UserDashboard from "./pages/User/Dashboard";
import MyTasks from "./pages/User/MyTasks";
import ViewTaskDetails from "./pages/User/ViewTaskDetails";

import UserProvider from "./context/userContext.jsx";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import LandingPage from "./pages/LandingPage";
// import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage";
// import ResetPasswordPage from "./pages/Auth/ReserPasswordPage";
import SocketProvider from "./context/SocketContext";

function App() {
  return (
    <UserProvider>
      <SocketProvider>
        <div>
          <Router>
            <Routes>
              {/* Landing Routes */}
              <Route path="/landing" element={<LandingPage />} />

              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              {/* <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} /> */}

              {/* Admin Routes */}
              <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/tasks" element={<ManageTasks />} />
                <Route path="/admin/create-task" element={<CreateTask />} />
                <Route path="/admin/users" element={<ManageUsers />} />
              </Route>

              {/* User Routes */}
              <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
                <Route path="/user/dashboard" element={<UserDashboard />} />
                <Route path="/user/tasks" element={<MyTasks />} />
                <Route
                  path="/user/task-details/:id"
                  element={<ViewTaskDetails />}
                />
              </Route>

              {/* Default Route */}
              <Route path="/" element={<Root />} />
            </Routes>
          </Router>
        </div>
      </SocketProvider>
    </UserProvider>
  );
}

export default App;

const Root = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <Outlet />;

  if (!user) {
    return <Navigate to="/landing" />;
  }

  return user.role === "admin" ? (
    <Navigate to="/admin/dashboard" />
  ) : (
    <Navigate to="/user/dashboard" />
  );
};
