import mongoSanitize from "express-mongo-sanitize";
import xss from "xss";

export const mongoSanitizer = mongoSanitize({
  replaceWith: "_",
  onSanitize: ({ req, key }) => {
    req.sanitizedKeys = [...(req.sanitizedKeys || []), key];
  }
});

export function cleanString(value) {
  if (typeof value !== "string") return value;
  return xss(value.trim(), {
    whiteList: {},
    stripIgnoreTag: true,
    stripIgnoreTagBody: ["script", "style"]
  });
}

export function sanitizeObject(value) {
  if (Array.isArray(value)) return value.map(sanitizeObject);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, sanitizeObject(entry)]));
  }
  return cleanString(value);
}
