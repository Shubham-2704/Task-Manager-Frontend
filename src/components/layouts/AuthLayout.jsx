import React from "react";
import UI_IMG from "../../assets/images/auth-img.png";
import AuthVisuals from "./AuthVisuals";

const AuthLayout = ({ children }) => {
  return (
    // <div className="flex">
    //   <div className="w-screen h-screen md:w-[68vw] px-12 pt-8 pb-12">
    //     <h2 className="text-lg font-medium text-black">Task Manager</h2>
    //     {children}
    //   </div>

    //   <div className="hidden md:flex items-center justify-center w-[46vw] h-screen">
    //     <img src={UI_IMG} alt="auth-img" />
    //   </div>
    // </div>

    <div className="min-h-screen bg-white lg:grid  dark:bg-gray-900/80 lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-8 lg:p-12">
        <main className="w-full max-w-lg">
          <h2 className="text-xl md:text-2xl font-semibold">Task Manager</h2>
          {children}
        </main>
      </div>
      <div className="hidden lg:block relative h-full">
        <AuthVisuals />
      </div>
    </div>
  );
};

export default AuthLayout;
