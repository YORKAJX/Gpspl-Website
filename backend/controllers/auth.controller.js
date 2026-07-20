import { authService } from "../services/auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getRequestMeta } from "../middleware/requestContext.js";

export const registerController = asyncHandler(async (req, res) => {
  const user = await authService.createUser(req.body);
  res.status(201).json({ user });
});

export const loginController = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body, getRequestMeta(req));
  res.json(result);
});

export const refreshController = asyncHandler(async (req, res) => {
  const result = await authService.refresh(req.body.refreshToken, getRequestMeta(req));
  res.json(result);
});

export const logoutController = asyncHandler(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(204).send();
});

export function meController(req, res) {
  res.json({ user: req.user });
}
