export const ws = new WebSocket(
  `${import.meta.env.VITE_WS_BASE_URL}/ws?token=${localStorage.getItem("token")}`
);
