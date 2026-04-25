// socket.ts
import { Server } from "socket.io";

let io: Server;

export const initSocket = (server: any) => {
      io = new Server(server, {
            cors: {
                  origin: "http://localhost:5173",
                  methods: ["GET", "POST"],
            },
      });

      io.on("connection", (socket) => {

            // room for all admin event
            socket.on("join_admin", () => {
                  console.log("Admin connected!");
                  socket.join("admin"); 
            });
            
            // Customer joins their own private room
            socket.on("join_user", (user_id) => {
                  console.log("User connected!");
                  // Private room for a specific user
                  socket.join(`user_${user_id}`);
            
                  // Global users room for broadcast events
                  socket.join("users");
            });

      });

      return io;
};

export const getIO = () => {
      if (!io) throw new Error("Socket.io not initialized");
      return io;
};