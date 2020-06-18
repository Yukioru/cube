require("@babel/register")({
  extensions: ['.ts', '.tsx'],
});
require('dotenv').config();
require("./app");
