import { configService } from "../services/config.service.js";

export function publicConfigController(_req, res) {
  res.setHeader("Cache-Control", "public, max-age=300");
  res.json(configService.publicConfig());
}
