// import logo from "./logo.svg";
// import './App.css';

import Login from "./components/Login/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import MainLayout from "./components/Layout/Layout";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Dashboard from "./components/Dashboard/Dashboard";
// import DesignationPage from "./components/Designation/Designation";
// import UserDashboard from "./components/Users/UserDashboard/UserDashboard";
// import Register from "./components/Register/Register";
import { UserProvider } from "./context/UserContext";
// import { SessionProvider } from "./context/SessionContext";
import { useUser } from "./context/UserContext";
import MyRouter from "./components/MyRouter/MyRouter";
function App() {
  const notify = (message) => toast(message);
  // const { user } = useUser();

  return (
    <div className="App h-100">
      <ToastContainer />
      {/* <Login onSubmit={notify} /> */}
      <UserProvider>
        {/* <SessionProvider> */}
          <MyRouter />
        {/* </SessionProvider> */}
      </UserProvider>

      {/* <Login /> */}
    </div>
  );
}

export default App;
