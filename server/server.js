import http from 'http';
import {Server} from 'socket.io';
import app from './src/app.js';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { runMigrations } from './src/database/migrate.js';
dotenv.config();

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true
    }
  })
  export const getSocket = () => io;
  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);
    socket.on("disconnected", () => {
      console.log("Client disconnected:", socket.id);
    })
  });

async function serverStart() {

  const pool = await connectDB();   

  await runMigrations(pool);        

  

  server.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
  });

}

serverStart();