const path = require("path");

module.exports = ({ env }) => ({
  connection:
    env("DATABASE_ENGINE", "sqlite") === "sqlite"
      ? {
          client: "sqlite",
          connection: {
            filename: path.join(
              __dirname,
              "..",
              env("DATABASE_FILENAME", ".tmp/data.db")
            ),
          },
          useNullAsDefault: true,
        }
      : {
          client: "postgres",
          connection: {
            host: env("DATABASE_HOST", "127.0.0.1"),
            port: env.int("DATABASE_PORT", 5432),
            database: env("DATABASE_NAME", ""),
            user: env("DATABASE_USER", ""),
            password: env("DATABASE_PASSWORD", ""),
          },
          useNullAsDefault: true,
        },
});
