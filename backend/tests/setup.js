process.env.NODE_ENV = "test";
process.env.DATABASE_URL = process.env.DATABASE_URL || "postgresql://gpspl:gpspl@localhost:5432/gpspl_test";
process.env.JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "test_access_secret_32_characters_minimum";
process.env.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "test_refresh_secret_32_characters_minimum";
process.env.COOKIE_SECRET = process.env.COOKIE_SECRET || "test_cookie_secret_24_chars_min";
process.env.FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:8082";
process.env.API_BASE_URL = process.env.API_BASE_URL || "http://localhost:4000";
