import React from "react";
import { motion } from "framer-motion";

const TaskCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-2xl w-full max-w-sm border border-white/20"
  >
    <div className="flex justify-between items-start mb-4">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
            Pending
          </span>
          <span className="px-3 py-1 text-xs font-medium bg-amber-100 text-amber-700 rounded-full">
            Medium Priority
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-800">
          Social Media Campaign
        </h3>
      </div>
      <div className="flex -space-x-2">
        <img
          src="https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1"
          alt="User 1"
          className="w-8 h-8 rounded-full border-2 border-white object-cover"
        />
        <img
          src="https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1"
          alt="User 2"
          className="w-8 h-8 rounded-full border-2 border-white object-cover"
        />
        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold text-slate-600 border-2 border-white">
          +2
        </div>
      </div>
    </div>
    <p className="text-slate-600 text-sm mb-4">
      Develop a content plan for the upcoming product launch. Create visually
      appealing designs with engaging captions.
    </p>
    <div className="mb-4">
      <div className="flex justify-between text-xs text-slate-500 mb-1">
        <span>Tasks Done</span>
        <span>4 / 10</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2">
        <div
          className="bg-brand-blue h-2 rounded-full"
          style={{ width: "40%" }}
        ></div>
      </div>
    </div>
    <div className="flex justify-between text-sm text-slate-500 border-t border-slate-200 pt-4">
      <div>
        <p className="font-medium text-slate-600">Start Date</p>
        <p>16th Mar 2025</p>
      </div>
      <div className="text-right">
        <p className="font-medium text-slate-600">Due Date</p>
        <p>28th Mar 2025</p>
      </div>
    </div>
  </motion.div>
);

const UserCard = ({ name, email, imgSrc, delay = 0.4 }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    className="bg-white/80 backdrop-blur-lg p-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/20"
  >
    <img
      src={imgSrc}
      alt={name}
      className="w-12 h-12 rounded-full object-cover"
    />
    <div>
      <h4 className="font-bold text-slate-800">{name}</h4>
      <p className="text-sm text-slate-500">{email}</p>
    </div>
  </motion.div>
);

const AuthVisuals = () => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center p-8 overflow-hidden">
      <div className="relative w-full h-full">
        {/* Background decorative shapes */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -left-20 w-72 h-72 bg-white/5 rounded-full"
        ></motion.div>
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/5 rounded-2xl"
        ></motion.div>

        {/* Central glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px] bg-gradient-radial from-white/10 to-transparent rounded-full"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full gap-8">
          <motion.div
            className="self-start ml-12"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <UserCard
              name="Adam Cole"
              email="adam@taskflowapp.com"
              imgSrc="https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=1"
            />
          </motion.div>

          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            <TaskCard />
          </motion.div>

          <motion.div
            className="self-end mr-12"
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            <UserCard
              name="Luke Ryan"
              email="luke@taskflowapp.com"
              imgSrc="https://images.pexels.com/photos/842980/pexels-photo-842980.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=1"
              delay={0.6}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthVisuals;
