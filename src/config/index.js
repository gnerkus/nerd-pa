require('dotenv').config();

const config = require(`./${process.env.NODE_ENV}`);

export default config.default;
