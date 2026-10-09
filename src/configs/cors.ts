import cors from "cors";
import { ALLOWED_ORIGINS } from "../libs/env";

export const corsMiddleware = cors({
  origin(origin, callback) {
    // Allow non-browser requests, such as Postman and curl.
    if (!origin) {
      return callback(null, true);
    }

    if (ALLOWED_ORIGINS.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`Origin ${origin} is not allowed by CORS`));
  },

  credentials: true,
});
