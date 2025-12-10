import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';

// import routes
import authRoutes from './src/routes/authRoutes.js';
import meRoutes from './src/routes/meRoutes.js';
import auth from "./src/middleware/auth.js";

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// JWT body parsing
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));


// ---- Routes ----
app.use('/api/auth', authRoutes);
app.use('/api/me', auth, meRoutes);

// database

/*


// ---- MongoDB connection ----

const { MONGODB_URI } = process.env;

// Only connect to MongoDB when NOT running tests
if (process.env.NODE_ENV !== "test") {
  if (MONGODB_URI) {
    mongoose
      .connect(MONGODB_URI)
      .then(() => console.log("MongoDB connected"))
      .catch((err) => console.error("MongoDB connection error:", err));
  } else {
    console.warn(
      "MONGODB_URI not set; auth endpoints will fail until configured",
    );
  }
}
  
const PORT = process.env.PORT || 4000;
const CONNECTION_URL = process.env.CONNECTION_URL;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));
*/

const PORT = process.env.PORT || 3001;
const HOST = "127.0.0.1";

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
