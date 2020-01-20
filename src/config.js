module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://woody:allthewood52@localhost/tonewoods',
    // DATABASE_URL: 'postgres://oixkgeuzqysowq:e570d8150ef43e1af7a7dd1210b4bc835bf587c5204ccaeca47ed3e8f52490ae@ec2-174-129-255-10.compute-1.amazonaws.com:5432/d9h9kj03iruk7j',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://woody@localhost/tonewoods-test',
    JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
  }