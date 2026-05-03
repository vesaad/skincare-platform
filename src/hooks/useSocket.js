import { useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { addNotification } from "../store/slices/notificationSlice";

let socket;

export const useSocket = (userId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket = io("http://localhost:3001");
    socket.emit("user:join", userId);
    socket.on("notification:new", (notif) => dispatch(addNotification(notif)));
    return () => socket.disconnect();
  }, [userId]);

  return socket;
};
