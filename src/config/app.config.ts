export default () => ({
  port: parseInt(process.env.PORT, 10) || 6060,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
});
