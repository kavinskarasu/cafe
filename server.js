const dotenv = require("dotenv");
const app = require("./app");
dotenv.config();
const DB = require("./db");
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
