import { Response } from "express";
import { IReqUser } from "../utils/interfaces";
import response from "../utils/response";
import { supabase } from "../libs/supabase";

const ACCESS_TOKEN_COOKIE = "access_token";
const REFRESH_TOKEN_COOKIE = "refresh_token";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export default {
  async login(req: IReqUser, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return response.error(res, "Email and password are required");
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error || !data.user || !data.session) {
        return response.error(res, "Invalid email or password");
      }

      const { session, user } = data;

      res.cookie(ACCESS_TOKEN_COOKIE, session.access_token, {
        ...cookieOptions,
        maxAge: session.expires_in * 1000,
      });

      res.cookie(REFRESH_TOKEN_COOKIE, session.refresh_token, {
        ...cookieOptions,
      });

      return response.success(
        res,
        {
          user: {
            id: user.id,
            email: user.email,
          },
        },
        "Login successful",
      );
    } catch (error) {
      return response.error(res, error);
    }
  },

  async logout(_: IReqUser, res: Response) {
    try {
      res.clearCookie(ACCESS_TOKEN_COOKIE, cookieOptions);
      res.clearCookie(REFRESH_TOKEN_COOKIE, cookieOptions);

      return response.success(res, null, "Logout successful");
    } catch (error) {
      return response.error(res, error);
    }
  },

  async me(req: IReqUser, res: Response) {
    try {
      const user = req.user;

      if (!user) {
        return response.error(res, "Unauthorized");
      }

      return response.success(res, user, "User data fetched successfully");
    } catch (error) {
      return response.error(res, error);
    }
  },
};
