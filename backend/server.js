const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./db/conn");

// Env file config
dotenv.config({ path: "./config/config.env" });

// Database Connection
connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(`Connected to port ${process.env.PORT}`);
});
