"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const topicsRoutes = require("./routes/topics");
const { PrismaClient } = require("@prisma/client");
exports.prisma = new PrismaClient();
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/topics", topicsRoutes);
// //HTTP ERROR HANDLER
// app.use((req:any, res:any, next:any)=>{
//   res.status(404).send("Could not find route");
// })
app.use((error, req, res, next) => {
    if (res.headerSent) {
        res.status(error.code || 500);
        res.json({ message: error.message || "Uknow error" });
    }
    next();
});
app.listen(process.env.PORT, () => {
    console.log("Server is running");
});
//# sourceMappingURL=index.js.map