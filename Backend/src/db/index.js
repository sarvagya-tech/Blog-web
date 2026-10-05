import mongoose from "mongoose";
import dns from "node:dns";
import { DB_NAME } from "../constants.js";

// Ensure reliable DNS resolution for MongoDB Atlas SRV records on Windows/local networks
try {
  dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
} catch (dnsErr) {
  console.warn("DNS server setup notice:", dnsErr?.message);
}

const connectdb = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: DB_NAME,
    });

    console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    return connectionInstance;
  } catch (error) {
    console.error("db connection failed", error);
    throw error;
  }
};

export default connectdb;