import express from "express";
import "dotenv/config";
import path from "path";
import session from "express-session";

import userRoutes from "./routers/userRoutes";
import roleRoutes from "./routers/roleRoutes";
import permissionRoutes from "./routers/permissionRoutes";
import authRoutes from "./routers/authRoutes";

const app = express();

// =====================
// 1. BODY PARSER (WAJIB DI ATAS ROUTES)
// =====================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// =====================
// 2. SESSION
// =====================
app.use(
  session({
    secret: "rbac-secret",
    resave: false,
    saveUninitialized: false,
  })
);

// =====================
// 3. VIEW ENGINE
// =====================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// =====================
// 4. ROUTES
// =====================
app.use(authRoutes);
app.use("/users", userRoutes);
app.use("/roles", roleRoutes);
app.use("/permissions", permissionRoutes);

// =====================
// 5. HOME
// =====================
app.get("/", (req, res) => {
  res.send("RBAC System Running 🚀");
});

// =====================
// 6. START SERVER
// =====================
app.listen(process.env.PORT, () => {
  console.log(`Server running http://localhost:${process.env.PORT}`);
});