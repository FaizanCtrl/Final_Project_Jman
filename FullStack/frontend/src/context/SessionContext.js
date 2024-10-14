import React, { createContext, useEffect, useState } from "react";
import api from "../api";
import { useUser } from "./UserContext";
export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [sessionDuration, setSessionDuration] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const { user } = useUser();

  const logSession = async (userId, duration) => {
    await api.post("/user-sessions/log", { userId, duration });
  };

  const handleVisibilityChange = () => {
    console.log(document.visibilityState);
    if (document.visibilityState === "hidden") {
      if (sessionStartTime) {
        const duration = Math.floor((new Date() - sessionStartTime) / 1000); // Calculate duration in seconds
        logSession(user.id, duration); // Replace 1 with actual user ID
        setSessionDuration(0); // Reset duration
        setSessionStartTime(null); // Reset start time
      }
    } else {
      if (!sessionStartTime) {
        setSessionStartTime(new Date()); // Set start time
      }
    }
  };

  useEffect(() => {
    console.log("logg session");
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      // Log session on component unmount
      if (sessionStartTime) {
        const duration = Math.floor((new Date() - sessionStartTime) / 1000);
        logSession(user.id, duration); // Replace 1 with actual user ID
      }
    };
  }, [sessionStartTime]);

  return (
    <SessionContext.Provider value={{}}>{children}</SessionContext.Provider>
  );
};
