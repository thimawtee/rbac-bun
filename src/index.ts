import express from "express";
import "dotenv/config";
import path from "path";
import session from "express-session";

import userRoutes from "./routers/userRoutes";
import roleRoutes from "./routers/roleRoutes";
import permissionRoutes from "./routers/permissionRoutes";
import authRoutes from "./routers/authRoutes";

const app = express();

// BODY PARSER
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// SESSION
app.use(
  session({
    secret: "rbac-secret",
    resave: false,
    saveUninitialized: false
  })
);

// 🔥 WAJIB: SYNC SESSION → REQ.USER
app.use((req: any, res, next) => {
  if (req.session.user) {
    req.user = req.session.user;
  }
  next();
});

// VIEW
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ROUTES
app.use(authRoutes);
app.use("/users", userRoutes);
app.use("/roles", roleRoutes);
app.use("/permissions", permissionRoutes);

// HOME
app.get("/", (req, res) => {
  res.send("RBAC System Running 🚀");
});

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});