import React, { useContext, useEffect } from "react";
import { UserContext } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";

const useUserAuth = () => {
  const { user, loading, clearUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) return;

    if (!user) {
      clearUser();
      navigate("/login");
    }
  }, [clearUser, loading, navigate, user]);
};

export default useUserAuth;
