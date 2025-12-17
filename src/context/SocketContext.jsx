import { createContext, useEffect, useState } from "react";
import { ws } from "@/lib/socket";

export const SocketContext = createContext(null);

const SocketProvider = ({ children }) => {
  const [taskUpdated, setTaskUpdated] = useState(0);

  useEffect(() => {
    const handleMessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "TASK_ASSIGNED") {
        // 🔔 Notification
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification(data.title, {
              body: data.message,
            });
          }
        });

        // 🔄 Trigger refresh
        setTaskUpdated((prev) => prev + 1);
      }
    };

    ws.addEventListener("message", handleMessage);

    return () => ws.removeEventListener("message", handleMessage);
  }, []);

  return (
    <SocketContext.Provider value={{ taskUpdated }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
