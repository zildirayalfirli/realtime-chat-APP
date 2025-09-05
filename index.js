// index.js
import "dotenv/config.js";
import http from "http";
import { Server as IOServer } from "socket.io";
import { connectDB } from "./db/mongodb.js";
import app from "./app.js";
import { initSocket } from "./socket/index.js";
import messageController from "./controllers/message_controller.js";

const PORT = process.env.PORT;

async function main() {
  await connectDB();

  const server = http.createServer(app);
  const io = new IOServer(server, {
    cors: { origin: "*", credentials: true }
  });

  messageController.bindIO(io);

  initSocket(io);

  server.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
