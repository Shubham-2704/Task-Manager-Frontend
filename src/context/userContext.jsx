import { API_PATHS } from "@/utils/apiPaths";
import axiosInstance from "@/utils/axiosInstance";
import React, { useEffect, useState } from "react";
import { UserContext } from "./UserContext";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // New state to track loading

  useEffect(() => {
    // console.log("useEffect called");

    if (user) return;

    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        // console.log("API profile called");

        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        setUser(response.data);
      } catch (error) {
        console.error("User not authenticated", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user]);

  const updateUser = async (userData) => {
    console.log("updateUser called");

    setUser(userData);
    localStorage.setItem("token", userData.token); // Save token
    setLoading(false);
  };

  const updateUserProfile = async (userData) => {
    try {
      const response = await axiosInstance.put(
        API_PATHS.AUTH.UPDATE_PROFILE,
        userData
      );
      setUser({ ...user, profileImageUrl: response.data.profileImageUrl });
      // localStorage.setItem("token", response.data.token); // Save token if it changes or for consistency
    } catch (error) {
      console.error("Failed to update user profile", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
    // setLoading(false);
  };

  // console.log(loading);
  // console.log(user);

  return (
    <UserContext.Provider
      value={{ user, loading, updateUser, clearUser, updateUserProfile }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
