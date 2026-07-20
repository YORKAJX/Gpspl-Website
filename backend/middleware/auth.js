import { userRepository } from "../repositories/user.repository.js";
import { ApiError } from "../utils/ApiError.js";
import { verifyAccessToken } from "../utils/tokens.js";

export async function authenticate(req, _res, next) {
  try {
    const header = req.get("authorization") || "";
    const [type, token] = header.split(" ");
    if (type !== "Bearer" || !token) throw new ApiError(401, "Authentication required");

    const payload = verifyAccessToken(token);
    const user = await userRepository.findById(payload.sub);
    if (!user || !user.isActive) throw new ApiError(401, "Invalid or inactive user");

    req.user = { id: user.id, email: user.email, name: user.name, role: user.role };
    next();
  } catch (error) {
    next(error.statusCode ? error : new ApiError(401, "Invalid authentication token"));
  }
}
