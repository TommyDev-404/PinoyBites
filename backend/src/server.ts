// server.ts
import app from "./app";
import { prisma } from "./lib/prisma";
import http from "http";
import { initSocket } from "./lib/socket.lib";
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;
const server = http.createServer(app);

// initialize socket
initSocket(server);

// start server
server.listen(PORT, () => {
	console.log(`[INFO] Server running at http://localhost:${PORT}`);
});

// Graceful shutdown
const shutdown = async (signal?: string) => {
	try {
		console.log(`[INFO] Received ${signal ?? "shutdown signal"}. Closing server...`);

		await new Promise<void>((resolve, reject) => {
			server.close((err) => {
				if (err) return reject(err);
				console.log("[INFO] HTTP server closed");
				resolve();
			});
		});

		await prisma.$disconnect();
		console.log("[INFO] Prisma client disconnected");

		process.exit(0);
	} catch (err) {
		console.error("[ERROR] Shutdown failed:", err);
		process.exit(1);
	}
};

// disconnect prisma when server is shutdown
process.on("SIGINT", shutdown);
//process.on("SIGTERM", shutdown);