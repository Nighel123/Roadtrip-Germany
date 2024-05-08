import express, { Express, NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import "dotenv/config";
import routes from "./routes";
import cors /* , { CorsOptions } */ from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import { response } from "./controllers/helpers";

// tsc-node-dev has problems with this. You can specify --transpile-only then its ok, but then it does not do any type checking...
declare module "express-session" {
  export interface SessionData {
    userId: string;
  }
}

const app: Express = express();
const PORT: string | number = process.env.PORT || 4000;

/* online db - connection string */
//const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@roadtrip-germany.e4wfsef.mongodb.net/${process.env.MONGO_DB_NAME}`;

/* local db - connection string */
/* Das folgende ist wichtig dafür das die cookies funktionieren! */
const corsOptions = {
  credentials: true,
  origin: process.env.CLIENT_URL,
};
app.use(cors(corsOptions));

const uri: string = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
app.use(express.static("./imageUploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.COOKIE_SECRET || "ich bin ein drolliger Lollo",
    store: MongoStore.create({ mongoUrl: uri }),
    name: process.env.COOKIE_NAME || "Meine Oma Stinkt unter den Achseln 1965",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: true,
    },
  })
);
app.use(routes);

app.use(async function (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  console.error(err.stack);
  response(res, 500, "Something broke!");
});

mongoose
  .connect(uri)
  .then((mon) => {
    //console.log("connection to mongoose established", mon);
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((error) => {
    throw error;
  });
