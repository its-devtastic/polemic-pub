module.exports = ({ env }) => ({
  sentry: {
    enabled: false,
    config: {
      dsn: env("SENTRY_DSN"),
      sendMetadata: true,
    },
  },
});
