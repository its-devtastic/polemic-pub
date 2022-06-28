module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  app: {
    keys: env.array("APP_KEYS"),
  },
  admin: {
    secret: env("ADMIN_JWT_SECRET"),
  },
  url: env("SERVER_URL", "http://localhost:1337"),
});
