module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL,
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://woody@localhost/tonewoods-test',
    JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',

    DB_NAME:process.env.PRODUCTION_MIGRATION_DB_NAME,
    DB_HOST:process.env.PRODUCTION_MIGRATION_DB_HOST,
    DB_PORT:process.env.PRODUCTION_MIGRATION_DB_PORT,
    DB_USER:process.env.PRODUCTION_MIGRATION_USER,
    DB_PASSWORD:process.env.PRODUCTION_MIGRATION_PASSWORD
  }