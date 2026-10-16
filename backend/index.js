import express from "express";
import connectToDB from "./database.js";
import cors from "cors";
import userRouter from './routes/user.routes.js'
import contactRouter from './routes/contact.routes.js'
import noteRouter from './routes/note.routes.js';
import cookieParser from "cookie-parser";

const app = express();
const PORT = 8000;

connectToDB();

app.use(
  cors({
    origin:"http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
// Use the cookie-parser middleware to easily read incoming cookies
app.use(cookieParser());
/* app.use(cors()) */

app.get("/", (req, res) => {
  res.send("Welcome to the Server");
});

/* app.post("/api/v3.2/user/signup", (req, res) => {});
app.post("/api/v3.2/user/login", (req, res) => {});
app.get("/api/v3.2/user/profile", (req, res) => {});
app.put("/api/v3.2/user/profile", (req, res) => {});
app.delete("/api/v3.2/user/profile", (req, res) => {}); */

app.use("/api/v3.2/user", userRouter);
app.use("/api/v3.2/note", noteRouter);
app.use("/api/v3.2/contact", contactRouter);

/* app.post("/api/v3.2/note/create", (req, res) => {});
app.get("/api/v3.2/note", (req, res) => {});
app.put("/api/v3.2/note/:noteid", (req, res) => {});
app.delete("/api/v3.2/note/:noteid", (req, res) => {}); */

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
