require('dotenv').config();
const fs = require('fs');

const { STREAM_URL = '[]' } = process.env;

fs.writeFileSync('./app/public/cube.m3u', JSON.parse(STREAM_URL).join(`\n`).trim());