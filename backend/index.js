import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from "mongoose";

// import routes
// import postRoutes from './routes/posts.js';
// import userRoutes from './routes/users.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

// JWT body parsing
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

app.use(cors());

// ---- Routes ----
app.use('/posts', postRoutes);
app.use('/users', userRoutes);

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