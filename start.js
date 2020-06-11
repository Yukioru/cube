require("@babel/register")({
  plugins: [
    [
      "import",
      {
        libraryName: "antd",
        libraryDirectory: "lib",
      },
    ],
    [
      "import",
      {
        libraryName: "@ant-design/icons",
        libraryDirectory: "lib/icons",
        camel2DashComponentName: false,
      },
      "@ant-design/icons",
    ],
  ],
});
require('dotenv').config();
require("./app");
