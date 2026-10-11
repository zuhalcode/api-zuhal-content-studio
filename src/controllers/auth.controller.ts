import { Response } from "express";
import { IReqUser } from "../utils/interfaces";
import response from "../utils/response";
import { supabase } from "../libs/supabase";

const ACCESS_TOKEN_COOKIE = "access_token";
const REFRESH_TOKEN_COOKIE = "refresh_token";

const isProduction = process.env.NODE_ENV === "production";

export const getCookieOptions = (req?: IReqUser) => {
  const origin = req?.headers?.origin;
  const isCrossSite = Boolean(origin && isProduction);

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: (isCrossSite ? "none" : "lax") as "none" | "lax",
    path: "/",
  };
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
      const options = getCookieOptions(req);

      res.cookie(ACCESS_TOKEN_COOKIE, session.access_token, {
        ...options,
        maxAge: session.expires_in * 1000,
      });

      res.cookie(REFRESH_TOKEN_COOKIE, session.refresh_token, {
        ...options,
      });

      return response.success(
        res,
        {
          user: {
            id: user.id,
            email: user.email,
          },
          access_token: session.access_token,
          refresh_token: session.refresh_token,
          expires_in: session.expires_in,
        },
        "Login successful",
      );
    } catch (error) {
      return response.error(res, error);
    }
  },

  async logout(req: IReqUser, res: Response) {
    try {
      const accessToken = req.cookies?.[ACCESS_TOKEN_COOKIE];
      if (accessToken) {
        try {
          await supabase.auth.admin.signOut(accessToken);
        } catch {
          // Silently ignore if token is already invalidated or expired
        }
      }

      const options = getCookieOptions(req);
      res.clearCookie(ACCESS_TOKEN_COOKIE, options);
      res.clearCookie(REFRESH_TOKEN_COOKIE, options);

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
