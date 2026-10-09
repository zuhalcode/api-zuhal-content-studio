import type { Response, NextFunction } from "express";
import { supabase } from "../libs/supabase";
import type { IReqUser } from "../utils/interfaces";

export async function isAuthenticated(
  req: IReqUser,
  res: Response,
  next: NextFunction,
) {
  try {
    const accessToken = req.cookies.access_token;

    if (!accessToken) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Authentication required",
      });
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Invalid or expired session",
      });
    }

    req.user = {
      id: user.id,
      email: user.email,
    };

    return next();
  } catch (error) {
    console.error("Authentication error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}
